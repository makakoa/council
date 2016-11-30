'use strict';

var express = require('express'),
    timeUtil = require('util/time'),
    Promise = require('util/promise'),
    _ = require('lodash'),
    config = require('config');

var app = express();
var db = require('db')(config.db);

var store = {
  question: db.store('question.question'),
  vote: db.store('question.vote')
};

var bodyParser = require('body-parser');
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(require('middleware/cors'));

var pubsub = require('service/pubsub')();

app.post('/question/:questionId/vote', function(req, res) {
  Promise.all([
    store.question.findOne({id: req.params.questionId}),
    store.vote.findOne({
      questionId: req.params.questionId,
      councilToken: req.headers['council-token']
    })
  ]).then(_.spread(function(question, existing) {
    if (question.councilToken === req.headers['council-token']) {
      return res.sendStatus(204);
    }

    if (existing) {
      if (existing.choiceIndex === req.body.choiceIndex) {
        return res.sendStatus(204);
      }

      store.vote.update({
        questionId: req.params.questionId,
        councilToken: req.headers['council-token']
      }, {
        choiceIndex: req.body.choiceIndex
      }).then(function() {
        pubsub.publish('/all', {
          message: 'CHANGE_VOTE',
          data: {
            questionId: req.params.questionId,
            choiceIndex: req.body.choiceIndex,
            councilToken: req.headers['council-token']
          }
        });
      });
    } else {
      store.vote.insert({
        questionId: req.params.questionId,
        choiceIndex: req.body.choiceIndex,
        councilToken: req.headers['council-token']
      }).then(function(vote) {
        res.send(vote);
        pubsub.publish('/all', {
          message: 'NEW_VOTE',
          data: vote
        });
      });
    }
  }));
});

app.post('/question', function(req, res) {
  store.question.insert({
    prompt: req.body.prompt,
    choices: req.body.choices,
    councilToken: req.headers['council-token']
  }).then(function(newQuestion) {
    res.send(newQuestion);
    pubsub.publish('/all', {
      message: 'NEW_QUESTION',
      data: newQuestion
    });

    setTimeout(function() {
      checkQuestion(newQuestion);
    }, timeUtil.second * 29);
  });
});

app.get('/question', function(req, res) {
  req;
  store.question.find().then(function(questions) {
    res.send(questions);
  });
});

app.get('/vote', function(req, res) {
  req;
  store.vote.find().then(function(votes) {
    res.send(votes);
  });
});

function checkQuestion(question) {
  store.vote.find({
    questionId: question.id
  }).then(function(votes) {
    if (votes.length) return;
    var robotPick = Math.floor(Math.random() * question.choices.length);
    store.vote.insert({
      questionId: question.id,
      choiceIndex: robotPick,
      councilToken: 'ROBOT'
    }).then(function(vote) {
      pubsub.publish('/all', {
        message: 'NEW_VOTE',
        data: vote
      });
    });
  });
}

var port = process.env.PORT || 3000;
app.listen(port, function() {
  console.log('Server listening on ' + port);
});

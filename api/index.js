'use strict';

var express = require('express'),
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
  store.vote.insert({
    questionId: req.params.questionId,
    choiceIndex: req.body.choiceIndex
  }).then(function(vote) {
    res.send(vote);
  });
});

app.post('/question', function(req, res) {
  store.question.insert({
    prompt: req.body.prompt,
    choices: req.body.choices
  }).then(function(newQuestion) {
    res.send(newQuestion);
    pubsub.publish('/all', {
      message: 'NEW_QUESTION',
      data: newQuestion
    });
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

var port = process.env.PORT || 3000;
app.listen(port, function() {
  console.log('Server listening on ' + port);
});

'use strict';

var express = require('express'),
    config = require('config');

var app = express();
var db = require('db')(config.db);

var store = {
  question: db.store('question.question')
};

var bodyParser = require('body-parser');
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(require('middleware/cors'));

app.post('/question', function(req, res) {
  console.log('reqbody', req.body);
  store.question.insert({
    prompt: req.body.prompt,
    choices: req.body.choices
  }).then(function(newQuestion) {
    res.send(newQuestion);
  });
});

app.get('/questions', function(req, res) {
  req;
  store.question.find().then(function(questions) {
    res.send(questions);
  });
});

var port = process.env.PORT || 3000;
app.listen(port, function() {
  console.log('Server listening on ' + port);
});

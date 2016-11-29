'use strict';

var Flux = require('lib/flux'),
    hist = require('lib/history'),
    api = require('lib/api');

module.exports = Flux.createActions({
  ask: function(question) {
    var call = api.post('/question', question);

    call.tap(function(newQuestion) {
      hist.push('/question/' + newQuestion.id);
    });

    return {
      actionType: 'ASK_QUESTION',
      data: question,
      call: call
    };
  },

  vote: function(questionId, choiceIndex) {
    var call = api.post('/question/' + questionId + '/vote', {
      choiceIndex: choiceIndex
    });

    return {
      actionType: 'VOTE',
      data: {
        questionId: questionId,
        choiceIndex: choiceIndex
      },
      call: call
    };
  },

  addQuestion: function(data) {
    return {
      actionType: 'NEW_QUESTION',
      data: data
    };
  },

  loadVotes: function() {
    var call = api.get('/vote');

    return {
      actionType: 'LOAD_VOTES',
      call: call
    };
  },

  loadQuestions: function() {
    var call = api.get('/question');

    return {
      actionType: 'LOAD_QUESTIONS',
      call: call
    };
  }
});

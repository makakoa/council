'use strict';

var Flux = require('lib/flux'),
    api = require('lib/api');

module.exports = Flux.createActions({

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

  addVote: function(data) {
    return {
      actionType: 'NEW_VOTE',
      data: data
    };
  },

  loadVotes: function() {
    var call = api.get('/vote');

    return {
      actionType: 'LOAD_VOTES',
      call: call
    };
  }

});

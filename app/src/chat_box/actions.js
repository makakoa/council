'use strict';

var Flux = require('lib/flux'),
    hist = require('lib/history'),
    api = require('lib/api');

module.exports = Flux.createActions({
  chat: function(chat) {
    var call = api.post('/chat', chat);

    call.tap(function(newChatMsg) {
      hist.push('/chat/' + newChatMsg.id);
    });

    return {
      actionType: 'SEND_MESSAGE',
      data: chat,
      call: call
    };
  },

  addMessage: function(data) {
    return {
      actionType: 'NEW_MESSAGE',
      data: data
    };
  },

  loadMessages: function() {
    var call = api.get('/chat');

    return {
      actionType: 'LOAD_MESSAGES',
      call: call
    };
  }
});

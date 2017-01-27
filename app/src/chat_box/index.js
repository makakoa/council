'use strict';

var rust = require('rust'),
    _ = require('lodash');

var chatActions = require('chat_box/actions');
var messageStore = require('chat_box/store');

module.exports = rust.class({
  mixins: [messageStore.mixin],

  getInitialState: function() {
    return {
      message: '',
      chatMsgs: messageStore.get()
    };
  },

  storeDidChange: function() {
    this.setState({
      chatMsgs: messageStore.get()
    });
  },

  onInput: function(e) {
    var val = e.target.value;
    this.setState({message: val});
  },

  onSubmit: function(e) {
    e.preventDefault();
    console.log('chatMessage:', this.state.message);

    if (!this.state.message) {
      alert('need message');
      return;
    }

    chatActions.chat({
      message: this.state.message
    });
  },

  render: function() {
    console.log('DIS DA CHETBOX: ',this.state.chatMsgs);

    return rust.o2([
      'div',
      {id: 'chatbox'},

      ['ul', rust.list('chatMessages',
      _.map(_.sortBy(this.state.chatMsgs, 'created'), 'body'))
      ],

      ['br'],

      [
        'form',
        {
          onSubmit: this.onSubmit
        },

        ['input', {
          id: 'message',
          value: this.state.message,
          onInput: this.onInput,
          onChange: this.onInput,
          placeholder: 'ChetBox [@_@]'
        }],

        ['br'],
        ['button', {
          id: 'submit',
          type: 'submit',
          onClick: this.onSubmit
        }, 'Chet']

      ]
    ]);
  }
});

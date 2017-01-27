'use strict';

var rust = require('rust'),
    _ = require('lodash'),
    Link = require('react-router').Link;

var chatActions = require('chat_box/actions');

module.exports = rust.class({
  getInitialState: function() {
    return {
      message: ''
    };
  },

  onInput: function(e) {
    var val = e.target.value;
    this.setState({message: val});
  },

  onSubmit: function(e) {
    e.preventDefault();
    console.log('value', this.state.message);

    if (!this.state.message) {
      alert('need message');
      return;
    }

    chatActions.chat({
      message: this.state.message
    });
  },

  render: function() {

    var ctx = this;

    return rust.o2([
      'div',
      {id: 'chatbox'},

      // rust.list('chatMessages',
      // _.map(_.sortBy(this.state.message, 'created').reverse(),
      // 'li'))

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

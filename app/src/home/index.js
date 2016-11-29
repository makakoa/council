'use strict';

var rust = require('rust'),
    _ = require('lodash'),
    Link = require('react-router').Link;

var questionStore = require('question/store');

module.exports = rust.class({
  mixins: [questionStore.mixin],

  getInitialState: function() {
    return {
      questions: questionStore.get()
    };
  },

  storeDidChange: function() {
    this.setState({
      questions: questionStore.get()
    });
  },

  render: function() {
    return rust.o2([
      'div',
      ['h1', 'Home'],
      [Link, {to: '/ask'}, 'Ask'],

      rust.list('questions', _.map(this.state.questions, function(q) {
        return [
          'div',
          'Prompt: ',
          q.prompt,
          rust.list('choices', _.map(q.choices, function(c) {
            return ['div', c];
          }))
        ];
      }))
    ]);
  }
});

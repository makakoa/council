'use strict';

var rust = require('rust'),
    _ = require('lodash'),
    question = require('question'),
    Link = require('react-router').Link;

var questionStore = require('question/store');
var voteStore = require('vote/store');

module.exports = rust.class({
  mixins: [questionStore.mixin, voteStore.mixin],

  getInitialState: function() {
    return {
      questions: questionStore.get(),
      votesByQuestionId: voteStore.getByQuestionId()
    };
  },

  storeDidChange: function() {
    this.setState({
      questions: questionStore.get(),
      votesByQuestionId: voteStore.getByQuestionId()
    });
  },

  questionItem: function(q) {
    var votes = this.state.votesByQuestionId[q.id] || [];

    return [question, {
      question: q,
      votes: votes
    }];
  },

  render: function() {

    return rust.o2([
      'div',

      ['h1', 'The Council'],

      [Link, {to: '/ask'}, 'Ask'],

      rust.list('questions', _.map(this.state.questions, this.questionItem))
    ]);
  }
});

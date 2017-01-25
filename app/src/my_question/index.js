'use strict';

var rust = require('rust'),
    _ = require('lodash'),
    top = require('top'),
    question = require('question'),
    Link = require('react-router').Link;

var questionStore = require('question/store');
var voteStore = require('vote/store');
var api = require('lib/api');

module.exports = rust.class({
  mixins: [questionStore.mixin, voteStore.mixin],

  getInitialState: function() {
    var councilToken = api.getCouncilToken();
    return {
      questions: questionStore.get().filter(function(question){
        return question.councilToken === councilToken;
      }),
      votesByQuestionId: voteStore.getByQuestionId()
    };
  },

  storeDidChange: function() {
    var councilToken = api.getCouncilToken();
    this.setState({
      questions: questionStore.get().filter(function(question){
        return question.councilToken === councilToken;
      }),
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

      [top, {
        left: [Link, {to: '/'}, ['i', {className: 'fa fa-chevron-left'}]],
        middle: ['h1', 'My Questions'],
        right: [Link, {to: '/ask'}, 'Ask']
      }],

      rust.list('questions',
      _.map(_.sortBy(this.state.questions, 'created').reverse(),
      this.questionItem))
    ]);
  }
});

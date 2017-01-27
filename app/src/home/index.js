'use strict';

var rust = require('rust'),
    _ = require('lodash'),
    top = require('top'),
    mid = require('mid'),
    question = require('question'),
    chatbox = require('chat_box'),
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
      votes: votes,
      class: 'home-question'
    }];
  },

  render: function() {

    return rust.o2([
      'div',

      [top, {
        left: [Link, {to: '/mine'}, 'My Questions'],
        middle: ['img', {
          style: {height: '50px'},
          src: 'assets/council-light.png'
        }],
        right: [Link, {to: '/ask'}, 'Ask']
      }],
      [mid, {
        left: [chatbox],
        middle: rust.list('questions',
      _.map(_.sortBy(this.state.questions, 'created').reverse(),
      this.questionItem))
      }]
    ]);
  }
});

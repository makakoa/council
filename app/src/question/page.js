'use strict';

var rust = require('rust'),
    Link = require('react-router').Link,
    question = require('question');

var questionStore = require('question/store');
var voteStore = require('vote/store');

module.exports = rust.class({
  mixins: [questionStore.mixin, voteStore.mixin],

  getInitialState: function() {
    return {
      question: questionStore.getById(this.props.params.id),
      votes: voteStore.getByQuestionId(this.props.params.id)
    };
  },

  storeDidChange: function() {
    this.setState({
      question: questionStore.getById(this.props.params.id),
      votes: voteStore.getByQuestionId(this.props.params.id)
    });
  },

  render: function() {
    console.log('props', this.props);
    console.log('state', this.state);

    return rust.o2([
      'div',

      [Link, {
        to: '/'
      }, 'Home'],

      ['h1', 'The Council'],

      this.state.question && this.state.votes
      ? [question, {
        question: this.state.question,
        votes: this.state.votes || []
      }]
      : 'Loading...'
    ]);
  }
});

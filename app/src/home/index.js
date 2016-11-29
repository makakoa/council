'use strict';

var rust = require('rust'),
    _ = require('lodash'),
    timeUtil = require('util/time'),
    Link = require('react-router').Link;

var questionActions = require('question/actions');
var questionStore = require('question/store');
var voteStore = require('vote/store');

module.exports = rust.class({
  mixins: [questionStore.mixin],

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

  vote: function(questionId, choiceIndex) {
    questionActions.vote(questionId, choiceIndex);
  },

  render: function() {
    console.log('state', this.state);
    var ctx = this;

    return rust.o2([
      'div',
      ['h1', 'Home'],
      [Link, {to: '/ask'}, 'Ask'],

      rust.list('questions', _.map(this.state.questions, function(q) {
        var votes = ctx.state.votesByQuestionId[q.id] || [];

        var counts = Array(q.choices.length);
        counts.fill(0);
        _.each(votes, function(v) {
          counts[v.choiceIndex] += 1;
        });

        return timeUtil.timeBetween(
          q.created, new Date()
        ) > (timeUtil.second * 30)
          ? [
            'div',
            q.prompt,
            rust.list('choices', _.map(q.choices, function(c, i) {
              return ['button', {
                onClick: ctx.vote.bind(ctx, q.id, i)
              }, c, ' [', counts[i], ']'];
            }))
          ]
        : [
          'div',
          'Prompt: ',
          q.prompt,
          rust.list('choices', _.map(q.choices, function(c, i) {
            return ['div', c, ' [', counts[i], ']'];
          }))
        ];
      }))
    ]);
  }
});

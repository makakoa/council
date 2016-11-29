'use strict';

var rust = require('rust'),
    _ = require('lodash'),
    timeUtil = require('util/time'),
    Link = require('react-router').Link;

var voteActions = require('vote/actions');
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

  vote: function(questionId, choiceIndex) {
    voteActions.vote(questionId, choiceIndex);
  },

  render: function() {
    console.log('state', this.state);
    var ctx = this;

    return rust.o2([
      'div',

      ['h1', 'The Council'],

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
            ['h3', q.prompt],
            rust.list('choices', _.map(q.choices, function(c, i) {
              return ['div', {
                style: {
                  cursor: 'pointer',
                  border: '1px solid',
                  padding: '4px',
                  margin: '4px'
                },
                onClick: ctx.vote.bind(ctx, q.id, i)
              }, c, ' [', counts[i], ']'];
            }))
          ]
        : [
          'div',
          ['h3', 'Prompt: '],
          q.prompt,
          rust.list('choices', _.map(q.choices, function(c, i) {
            return ['div', c, ' [', counts[i], ']'];
          }))
        ];
      }))
    ]);
  }
});

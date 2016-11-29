'use strict';

var rust = require('rust'),
    _ = require('lodash'),
    Link = require('react-router').Link,
    timeUtil = require('util/time');

var voteActions = require('vote/actions');

var voteDuration = timeUtil.second * 30;

module.exports = rust.class({

  vote: function(questionId, choiceIndex) {
    voteActions.vote(questionId, choiceIndex);
  },

  render: function() {

    var q = this.props.question;

    var counts = Array(q.choices.length);
    counts.fill(0);
    _.each(this.props.votes, function(v) {
      counts[v.choiceIndex] += 1;
    });

    var isOpen = timeUtil.timeBetween(q.created, new Date()) < voteDuration;

    var ctx = this;
    return rust.o2([
      'div',
      {
        class: isOpen ? 'open' : 'closed'
      },

      [Link, {
        to: '/question/' + q.id
      }, ['h3', q.prompt]],

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
    ]);
  }
});

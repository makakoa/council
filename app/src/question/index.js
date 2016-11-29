'use strict';

var rust = require('rust'),
    _ = require('lodash'),
    Link = require('react-router').Link,
    timeUtil = require('util/time'),
    Clipboard = require('clipboard');

var voteActions = require('vote/actions');

var voteDuration = timeUtil.second * 30;

module.exports = rust.class({

  componentDidMount: function() {
    this.clipboard = new Clipboard('.clipboard');
    // this.clipboard.on('success', function(e) {
    //   console.log('WINNING: ' + e);
    // });
  },

  componentWillUnmount: function() {
    this.clipboard.destroy();
  },

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
      })),
      ['button',
        {
          'data-clipboard-text': window.location.origin+'/question/' + q.id,
          className: 'clipboard'
        },
        ['img', {
          src:'https://clipboardjs.com/assets/images/clippy.svg',
          width:'25px',
          height:'25px'
        }]
      ]
    ]);
  }
});

'use strict';

var rust = require('rust'),
    _ = require('lodash'),
    Link = require('react-router').Link,
    timeUtil = require('util/time'),
    Clipboard = require('clipboard');

var voteActions = require('vote/actions');

var voteDuration = timeUtil.second * 30;

module.exports = rust.class({
  getInitialState: function() {
    return {};
  },

  componentDidMount: function() {
    this.clipboard = new Clipboard('#clipboard-' + this.props.question.id);
    // this.clipboard.on('success', function(e) {
    //   console.log('WINNING: ' + e);
    // });
  },

  componentWillUnmount: function() {
    this.stopClock();
    this.clipboard.destroy();
  },

  startClock: function() {
    this.timer = setInterval(this.tick, 150);
    this.ticking = true;
  },
  stopClock: function() {
    clearInterval(this.timer);
    this.ticking = false;
  },

  tick: function() {
    var q = this.props.question;
    var remaining = voteDuration - timeUtil.timeBetween(q.created, new Date());
    if (remaining < 0) this.stopClock();
    this.setState({remaining: remaining});
  },

  vote: function(questionId, choiceIndex) {
    voteActions.vote(questionId, choiceIndex);
  },

  render: function() {

    var q = this.props.question;

    var counts = Array(q.choices.length);
    var late = Array(q.choices.length);
    counts.fill(0);
    late.fill(0);
    var total = 0;
    var lateTotal = 0;
    _.each(this.props.votes, function(v) {
      if (timeUtil.timeBetween(q.created, v.created) < voteDuration) {
        counts[v.choiceIndex] += 1;
        total++;
      } else {
        late[v.choiceIndex] += 1;
        lateTotal++;
      }
    });
    var highest = Math.max.apply(null, counts) || 1;

    var isOpen = timeUtil.timeBetween(q.created, new Date()) < voteDuration;

    if (isOpen && !this.ticking) this.startClock();

    var ctx = this;
    return rust.o2([
      'question',
      {className: isOpen ? 'open' : 'closed'},

      [Link, {
        to: '/question/' + q.id
      }, ['h3', q.prompt]],

      rust.list('choices', _.map(q.choices, function(c, i) {
        return [
          'div',
          {
            className: [
              'choice',
              highest === counts[i] ? 'favored' : ''
            ].join(' '),
            onClick: ctx.vote.bind(ctx, q.id, i)
          },
          c,
          total ? [
            'span',
            ' (', Math.floor(counts[i] / total * 100), '%) - ', counts[i]
          ] : null,
          lateTotal ? [
            'div',
            {style: {fontSize: '12px'}},
            ' + ', late[i], ' late (',
            Math.floor((counts[i] + late[i]) / (total + lateTotal) * 100),
            '% overall)'
          ] : null
        ];
      })),

      this.ticking
        ? ['div', Math.floor(this.state.remaining / 1000), 's remaining']
        : null,

      ['div',
       {
         className: 'share-button',
         'data-clipboard-text': window.location.origin + '/question/' + q.id,
         id: 'clipboard-' + q.id
       },
       ['i', {
         className: 'fa fa-share-square-o',
         title: 'copy question URL'
       }]
      ]
    ]);
  }
});

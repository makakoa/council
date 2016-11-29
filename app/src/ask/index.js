'use strict';

var rust = require('rust'),
    Link = require('react-router').Link,
    top = require('top'),
    _ = require('lodash');

var questionActions = require('question/actions');

module.exports = rust.class({
  getInitialState: function() {
    return {
      prompt: '',
      choices: [
        'Yes',
        'No',
        'Maybe'
      ]
    };
  },

  onInput: function(e) {
    var val = e.target.value;
    this.setState({prompt: val});
  },

  addChoice: function() {
    var choices = this.state.choices;
    choices.push('');
    this.setState({
      choices: choices
    });
  },

  removeChoice: function(i) {
    var choices = this.state.choices;
    this.state.choices.splice(i, 1);
    this.setState({
      choices: choices
    });
  },

  editChoice: function(i, e) {
    var choices = this.state.choices;
    choices[i] = e.target.value;
    this.setState({
      choices: choices
    });
  },

  onSubmit: function(e) {
    e.preventDefault();
    console.log('value', this.state.prompt);
    console.log('choices', this.state.choices);

    if (!this.state.prompt) {
      alert('need prompt');
      return;
    } else if (this.state.choices.length < 2) {
      alert('need at least 2 choices');
      return;
    }

    questionActions.ask({
      prompt: this.state.prompt,
      choices: this.state.choices
    });
  },

  render: function() {

    var ctx = this;

    return rust.o2([
      'div',
      {id: 'ask-page'},

      [top, {
        left: [Link, {to: '/'}, ['i', {className: 'fa fa-chevron-left'}]],
        middle: ['h1', 'Ask']
      }],

      ['br'],

      [
        'form',
        {
          onSubmit: this.onSubmit
        },

        ['input', {
          id: 'prompt',
          value: this.state.prompt,
          onInput: this.onInput,
          onChange: this.onInput,
          placeholder: 'Present your situation'
        }],

        ['br'],
        rust.list('choices', _.map(this.state.choices, function(c, i) {
          return [
            'div',
            {id: 'choice'},
            ['input', {
              placeholder: 'Option',
              value: c,
              onInput: ctx.editChoice.bind(ctx, i),
              onChange: ctx.editChoice.bind(ctx, i)
            }],
            ['button', {
              className: 'remove',
              type: 'button',
              onClick: ctx.removeChoice.bind(ctx, i)
            }, ['i', {className: 'fa fa-trash'}]]
          ];
        })),

        ['br'],
        ['button', {
          id: 'add',
          type: 'button',
          onClick: this.addChoice
        }, ['i', {className: 'fa fa-plus'}], ' Add'],

        ['br'],
        ['button', {
          id: 'submit',
          type: 'submit',
          onClick: this.onSubmit
        }, 'Ask']

      ]
    ]);
  }
});

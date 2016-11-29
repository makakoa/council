'use strict';

var rust = require('rust'),
    _ = require('lodash');

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
    console.log('value', this.state.prompt);
    console.log('choices', this.state.choices);
    e.preventDefault();
  },

  render: function() {

    var ctx = this;

    return rust.o2([
      'div',
      ['h1', 'Ask'],

      [
        'form',
        {
          onSubmit: this.onSubmit
        },

        ['input', {
          style: {
            display: 'block'
          },
          value: this.state.prompt,
          onInput: this.onInput,
          placeholder: 'Prompt'
        }],

        ['br'],
        rust.list('choices', _.map(this.state.choices, function(c, i) {
          return [
            'div',
            ['button', {
              type: 'button',
              onClick: ctx.removeChoice.bind(ctx, i)
            }, 'x'],
            ['input', {
              value: c,
              onInput: ctx.editChoice.bind(ctx, i)
            }]
          ];
        })),

        ['br'],
        ['button', {
          style: {
            display: 'block'
          },
          type: 'button',
          onClick: this.addChoice
        }, 'Add'],

        ['br'],
        ['button', {
          style: {
            display: 'block'
          },
          type: 'submit',
          onClick: this.onSubmit
        }, 'Ask']

      ]
    ]);
  }
});

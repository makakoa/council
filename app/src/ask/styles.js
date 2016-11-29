'use strict';

var color = require('ui/color');

module.exports = {

  'form': {
    display: 'flex',
    'flex-direction': 'column',
    'align-items': 'stretch',

    'button': {
      'font-size': '18px',
      padding: '8px'
    }
  },

  button: {
    opacity: 0.3,
    transition: '300ms',

    '&:hover': {
      opacity: 1
    }
  },

  '#choice': {
    display: 'flex',
    'align-items': 'center',

    '.remove': {
      'font-size': '16px',
      border: 'none',
      'background-color': color.red,
      color: 'white'
    },

    input: {
      'flex-grow': '1',
      display: 'block',
      margin: '4px 8px'
    }
  },

  'h1': {
    'font-size': '38px',
    'font-weight': '300'
  },

  '#prompt': {
    'font-size': '18px'
  },

  '#add': {
    border: 'none',
    'background-color': color.blue,
    color: 'white',
    width: '100px'
  },

  '#submit': {
    border: 'none',
    'background-color': color.green,
    color: 'white'
  }

};

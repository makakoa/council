'use strict';

var color = require('ui/color');

module.exports = {
  '*': {
    margin: 0,
    padding: 0
  },

  '#app-entry': {
    'box-sizing': 'border-box',
    height: '100vh',
    'max-width': '70ch',
    'margin': '0 auto',
    padding: '20px'
  },

  'font-family': 'Oxygen, sans-serif',
  'background-color': color.background,
  color: color.font,

  // generic component styles
  a: {
    cursor: 'pointer',
    color: color.font,
    'text-decoration': 'none',
    '&:hover': {
      color: color.blue
    }
  },

  input: {
    'font-size': '16px',
    border: 'none',
    padding: '8px',
    'border-radius': '4px',

    '&::-webkit-input-placeholder': {
      'font-weight': '300'
    }
  },

  button: {
    padding: '4px',
    'cursor': 'pointer',
    border: '1px solid',
    'background-color': 'transparent',
    'border-radius': '4px',
    '&:hover': {
      color: color.blue
    }
  },

  'input:focus, button:focus': {
    outline: 'none'
  },

  // top styles
  '#top': {
    display: 'flex',
    'justify-content': 'space-between',
    'align-items': 'center',
    'left, right': {
      'text-align': 'center',
      width: '100px'
    }
  }

};

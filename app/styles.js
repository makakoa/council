'use strict';

var color = require('ui/color');

var pageTransition = '300ms';

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
    padding: '20px',

    'app-container': {
      display: 'block',
      width: '100%',
      height: '100%',
      position: 'relative'
    }
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
  },

  //mid styles
  '#mid': {
    display: 'flex',
    'justify-content': 'space-between',
    'align-items': 'center',
    'left, right': {
      'text-align': 'center',
      width: '100px'
    }
  },

  '.LEFT-enter': {
    transform: 'translateX(100vw)',
    transition: pageTransition
  },
  '.LEFT-enter-active': {
    transform: 'translateX(0)'
  },

  '.LEFT-leave': {
    display: 'block',
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
    transform: 'translateX(0)',
    transition: pageTransition
  },
  '.LEFT-leave.LEFT-leave-active': {
    transform: 'translateX(-100vw)'
  },

  '.RIGHT-enter': {
    transform: 'translateX(-100vw)',
    transition: pageTransition
  },
  '.RIGHT-enter-active': {
    transform: 'translateX(0)'
  },

  '.RIGHT-leave': {
    display: 'block',
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
    transform: 'translateX(0)',
    transition: pageTransition
  },
  '.RIGHT-leave-active': {
    transform: 'translateX(100vw)'
  }

};

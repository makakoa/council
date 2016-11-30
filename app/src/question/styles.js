'use strict';

var color = require('ui/color');

module.exports = {
  display: 'block',
  'border-radius': '4px',
  padding: '8px',
  margin: '8px',
  'background-color': color.font,

  a: {
    color: color.background
  },
  color: color.background,

  '.choice': {
    cursor: 'pointer',
    border: '1px solid',
    padding: '4px',
    margin: '4px'
  },

  '.favored': {
    color: color.green
  },

  '.share-button': {
    display: 'inline-block',
    'margin-right': 'auto',
    cursor: 'pointer',
    'i.fa': {
      fontSize: '20px'
    },

    opacity: '0.5',
    transition: '300ms',
    '&:hover': {
      opacity: 1
    }
  },

  '&.closed': {
    '.choice': {
      border: 'none'
    }
  }
};

'use strict';

var color = {
  background: '#444444',
  font: '#fefefe'
};

module.exports = {
  '*': {
    margin: 0,
    padding: 0
  },

  padding: '20px',

  'background-color': color.background,
  color: color.font,
  a: {
    color: color.font,
    'text-decoration': 'none'
  },

  'question': {
    display: 'block',
    'border-radius': '4px',
    padding: '4px',
    margin: '4px',
    'background-color': color.font,

    a: {
      color: color.background
    },
    color: color.background
  },

  'font-family': 'Oxygen, sans-serif'
};

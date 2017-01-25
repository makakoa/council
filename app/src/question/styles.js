'use strict';

var color = require('ui/color');

module.exports = {
  display: 'block',
  'border-radius': '4px',
  padding: '15px',
  margin: '8px',
  position: 'relative',
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

  '.tally-bar-style': {
    height:'9px',
    display:'inline-block'
  },

  '.vote-tally-bar': {
    'background-color':'#56789a'
  },

  '.favored-vote-tally': {
    'background-color':'#287856'
  },

  '.latevote-tally-bar': {
    'background-color':'#89abcd'
  },

  '.favored-latevote-tally': {
    'background-color':'#38cc70'
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
  '.my-ans':{
    'background-color': '#ffecba',
    'border-radius': '4px'
  },
  '&.closed': {
    '.choice': {
      border: 'none'
    },
    '&.home-mine.home-question>a>h3.my-prompt:before':{
      'content': '""',
      'border-color': 'transparent #656b6d',
      'border-style': 'solid',
      'border-width': '5px 0 5px 8px',
      'display': 'block',
      'height': '0',
      'width': '0',
      'left': '-10px',
      'top':'18px',
      'position': 'relative'
    }
  }
};

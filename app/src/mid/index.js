'use strict';

var rust = require('rust');

module.exports = rust.class({
  render: function() {
    return rust.o2([
      'div',
      {id: 'mid'},
      ['left', this.props.left],
      ['middle', this.props.middle],
      ['right', this.props.right]
    ]);
  }
});

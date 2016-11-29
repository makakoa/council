'use strict';

var rust = require('rust');

module.exports = rust.class({
  render: function() {
    return rust.o2([
      'div',
      ['h1', 'question', this.props.params.id]
    ]);
  }
});

'use strict';

var rust = require('rust'),
    _ = require('lodash'),
    React = require('react'),
    transitionGroup = require('react-addons-css-transition-group');

module.exports = rust.class({
  render: function() {
    var path = this.props.location.pathname;
    var transitionType = path === '/' ? 'RIGHT' : 'LEFT';

    var ctx = this;
    return rust.element(transitionGroup, {
      component: 'app-container',
      transitionName: transitionType || 'skip',
      transitionEnterTimeout: transitionType ? 500 : 10,
      transitionLeaveTimeout: transitionType ? 500 : 10
    }, React.Children.map(this.props.children, function(child) {
      return React.cloneElement(child, _.extend({key: path}, ctx.props));
    }));
  }
});

'use strict';

var react = require('react');
window.react = react;

var ReactDOM = require('react-dom'),
    Router = require('react-router'),
    Link = Router.Link,
    hist = require('lib/history'),
    rust = require('rust');

ReactDOM.render(
  rust.element(Router.Router, {
    history: hist,
    routes: [{
      path: '/about',
      component: rust.class({
        render: function() {
          return rust.o2([
            'div',
            'The Council'
          ]);
        }
      })
    }, {
      path: '/ask',
      component: require('ask')
    }, {
      path: '/question/:id',
      component: require('question')
    }, {
      path: '/',
      component: rust.class({
        render: function() {
          return rust.element(
            'div',
            null,
            'Home',
            rust.element(
              Link,
              {to: '/ask'},
              'Ask'
            )
          );
        }
      })
    }]
  }),
  document.getElementById('app-entry')
);

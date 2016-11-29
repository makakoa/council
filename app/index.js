'use strict';

var react = require('react');
window.react = react;

var ReactDOM = require('react-dom'),
    Router = require('react-router'),
    Link = Router.Link,
    rust = require('rust');

ReactDOM.render(
  rust.element(Router.Router, {
    history: Router.browserHistory,
    routes: [{
      path: '/about',
      component: rust.class({
        render: function() {
          var Ask = require('ask');
          return rust.o2([
            'div',
            [Ask],
            [Ask]
          ]);
        }
      })
    }, {
      path: '/ask',
      component: require('ask')
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

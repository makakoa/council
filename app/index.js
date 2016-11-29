'use strict';

var react = require('react');
window.react = react;

var ReactDOM = require('react-dom'),
    Router = require('react-router'),
    hist = require('lib/history'),
    notification = require('notification'),
    rust = require('rust');

notification.listenForNotifications();

var questionActions = require('question/actions');

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
      onEnter: function() {
        questionActions.loadQuestions();
      },
      component: require('home')
    }, {
      path: '*',
      component: rust.class({
        render: function() {
          return rust.element('div', null, 'Not found');
        }
      })
    }]
  }),
  document.getElementById('app-entry')
);

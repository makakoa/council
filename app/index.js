'use strict';

var react = require('react');
window.react = react;

var ReactDOM = require('react-dom'),
    Router = require('react-router'),
    hist = require('lib/history'),
    notification = require('notification'),
    rust = require('rust');

var tokenUtil = require('util/token'),
    api = require('lib/api');

if (!api.hasToken()) {
  api.setCouncilToken(tokenUtil.councilTokenGenerator());
}

var questionActions = require('question/actions');
var voteActions = require('vote/actions');
notification.listenForNotifications();
questionActions.loadQuestions();
voteActions.loadVotes();




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
      component: require('question/page')
    }, {
      path: '/',
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

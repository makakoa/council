'use strict';

var Flux = require('lib/flux'),
    _ = require('lodash');

var store = Flux.createStore({
  cache: [],

  get: function() {
    return store.cache;
  },

  add: function(data) {
    store.cache.push(data);
  },

  remove: function(selector) {
    store.cache.splice(_.indexOf(_.find(store.cache, selector)), 1);
  },

  replace: function(data) {
    store.cache = data;
  },

  collect: function(data) {
    store.cache = _.unionBy(store.cache, data, 'id');
  }
}, function(payload) {
  switch (payload.actionType) {
  case 'ASK_QUESTION':
    payload.call.then(function(newQuestion) {
      store.add(newQuestion);
      store.emitChange();
    });
    break;

  case 'NEW_QUESTION':
    store.collect([payload.data]);
    store.emitChange();
    break;

  case 'LOAD_QUESTIONS':
    payload.call.then(function(questions) {
      store.collect(questions);
      store.emitChange();
    });
    break;
  }
});
module.exports = store;

'use strict';

var Flux = require('lib/flux'),
    _ = require('lodash');

var store = Flux.createStore({
  cache: [],
  indexedCache: {},

  index: function() {
    store.indexedCache = _.keyBy(store.cache, 'id');
  },

  get: function() {
    return store.cache;
  },

  getById: function(id) {
    return id ? store.indexedCache[id] : store.indexedCache;
  },

  add: function(data) {
    store.cache.push(data);
    store.index();
  },

  remove: function(selector) {
    store.cache.splice(_.indexOf(_.find(store.cache, selector)), 1);
    store.index();
  },

  replace: function(data) {
    store.cache = data;
    store.index();
  },

  collect: function(data) {
    store.cache = _.unionBy(store.cache, data, 'id');
    store.index();
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

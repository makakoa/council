'use strict';

var Flux = require('lib/flux'),
    _ = require('lodash');

var store = Flux.createStore({
  cache: [],
  indexedCache: {},

  index: function() {
    store.indexedCache = _.groupBy(store.cache, 'questionId');
  },

  get: function() {
    return store.cache;
  },

  getByQuestionId: function(id) {
    return id ? store.indexedCache[id] : store.indexedCache;
  },

  add: function(data) {
    store.cache.push(data);
    store.index();
  },

  update: function(selector, update) {
    var item = _.find(store.cache, selector);
    if (item) {
      store.cache[_.indexOf(store.cache, item)] = _.extend({}, item, update);
    }
    store.index();
  },

  replace: function(data) {
    store.cache = data;
    store.index();
  },

  collect: function(data) {
    store.cache = _.unionBy(store.cache, data, function(vote) {
      return [
        vote.questionId,
        vote.councilToken || vote.created
      ].join(':');
    });
    store.index();
  }
}, function(payload) {
  switch (payload.actionType) {
  // case 'VOTE':
  //   store.add(payload.data);
  //   store.emitChange();
  //   break;

  case 'NEW_VOTE':
    store.add(payload.data);
    store.emitChange();
    break;

  case 'CHANGE_VOTE':
    store.update({
      questionId: payload.data.questionId,
      councilToken: payload.data.councilToken
    }, {
      choiceIndex: payload.data.choiceIndex
    });
    store.emitChange();
    break;

  case 'LOAD_VOTES':
    payload.call.then(function(questions) {
      store.collect(questions);
      store.emitChange();
    });
    break;
  }
});
module.exports = store;

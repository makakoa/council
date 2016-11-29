'use strict';

var expose = require('util/exposer')(module.exports),
    _hasStorage = true,
    _alt = {};

try {
  var testKey = 'test-for-storage';
  set(testKey, true);
  remove(testKey);
} catch(e) {
  _hasStorage = false;
}

expose(set);
function set(key, val) {
  if (!_hasStorage) {
    _alt[key] = val;
    return;
  }
  window.localStorage.setItem(key, val);
}

expose(setObject);
function setObject(key, val) {
  if (!_hasStorage) {
    set(key, val);
    return;
  }
  set(key, JSON.stringify(val));
}

expose(getObject);
function getObject(key) {
  if (!_hasStorage) return _alt[key];
  return JSON.parse(get(key));
}

expose(remove);
function remove(key) {
  if (!_hasStorage) {
    delete _alt[key];
    return;
  }
  window.localStorage.removeItem(key);
}

expose(get);
function get(key) {
  if (!_hasStorage) return _alt[key];
  return window.localStorage.getItem(key);
}
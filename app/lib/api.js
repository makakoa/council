'use strict';

var expose = require('util/exposer')(module.exports),
    http = require('util/http')();

var config = require('config'),
    storage = require('lib/storage');

// var defaultHeaders = {};
var urlPrefix = config.apiUrl;

function completeUrl(url) {
  return urlPrefix + url;
}

function headers() {
  return {
    'council-token': getCouncilToken()
  };
}

expose(getCouncilToken);
function getCouncilToken() {
  return storage.get('council-token');
}

expose(hasToken);
function hasToken() {
  return !!getCouncilToken();
}

expose(setCouncilToken);
function setCouncilToken(token) {
  storage.set('council-token', token);
}

expose(get);
function get(path) {
  return http.get(completeUrl(path), headers());
}

expose(post);
function post(path, payload) {
  return http.post(completeUrl(path), headers(), payload);
}

expose(put);
function put(path, payload) {
  return http.put(completeUrl(path), headers(), payload);
}

expose(del);
function del(path) {
  return http.delete(completeUrl(path), headers());
}

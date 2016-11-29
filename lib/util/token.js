'use strict';

var expose = require('util/exposer')(module.exports),
    crypto = require('crypto');

expose(councilTokenGenerator);
function councilTokenGenerator() {
  return crypto.randomBytes(16).toString('hex');
}
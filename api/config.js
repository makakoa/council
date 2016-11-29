'use strict';

var $ = process.env;

module.exports = {
  appUrl: $.APP_URL || 'http://localhost:8080',

  db: {
    url: $.DATABASE_URL || 'postgres://council:1234@localhost:5432/council',
    poolSize: 10,
    enableStore: true,
    debug: true
  }

};

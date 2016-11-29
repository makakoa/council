'use strict';

var $ = process.env;

module.exports = {
  appUrl: $.APP_URL || 'http://localhost:8080',

  db: {
    url: $.DATABASE_URL || 'postgres://council:1234@localhost:5432/council',
    poolSize: 10,
    enableStore: true,
    debug: true
  },

  pubnub: {
    publishKey: $.PUBNUB_PUBLISH
      || 'pub-c-b5fd09fd-b4fb-43ca-abbf-dd56856be520',
    subscribeKey: $.PUBNUB_SUBSCRIBE
      || 'sub-c-2b056f46-b5db-11e6-b6b9-0619f8945a4f'
  }

};

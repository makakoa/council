'use strict';

var $ = process.env;

// NOTE: changes here must also go in the webpack config injection

module.exports = {
  apiUrl: $.API_URL || 'http://localhost:3000',

  pubnub: {
    publishKey: $.PUBNUB_PUBLISH
      || 'pub-c-b5fd09fd-b4fb-43ca-abbf-dd56856be520',
    subscribeKey: $.PUBNUB_SUBSCRIBE
      || 'sub-c-2b056f46-b5db-11e6-b6b9-0619f8945a4f'
  }
};

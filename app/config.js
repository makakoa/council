'use strict';

var $ = process.env;

// NOTE: changes here must also go in the webpack config injection

module.exports = {
  apiUrl: $.API_URL || 'http://localhost:3000'

};

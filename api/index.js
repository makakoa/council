'use strict';

var express = require('express'),
    config = require('config');

var db = require('db')(config.db);

var app = express();

var port = process.env.PORT || 3000;

app.listen(port, function() {
  console.log('Server listening on ' + port);
});

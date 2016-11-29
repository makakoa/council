'use strict';

module.exports = function corsMiddleware(req, res, next) {

  res.header('Access-Control-Allow-Origin', req.headers.origin);

  res.header('Access-Control-Allow-Headers',
             req.header('Access-Control-Request-Headers'));

  res.header('Access-Control-Allow-Methods', [
    'GET', 'POST', 'PUT', 'DELETE'
  ].join(','));

  res.header('Access-Control-Allow-Credentials', 'true');

  next();
};

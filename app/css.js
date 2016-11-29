'use strict';

var expose = require('util/exposer')(module.exports),
    _ = require('lodash');

expose(toCSS);
function toCSS(prefix, obj) {
  var nested = '';
  var current = _.map(obj, function(val, key) {
    if (_.isObject(val)) {
      if (key.startsWith('@media')) {
        nested+= [key,'{',toCSS('',val),'}'].join('');
      } else {
        nested += toCSS(key.startsWith('&')
                        ? prefix + key.slice(1)
                        : prefix + ' ' + key, val);
      }
      return '';
    }
    return [key,':',val,';'].join('');
  }).join('');
  if (!current) return nested;
  return [prefix, '{', current, '}', nested ].join('');
}

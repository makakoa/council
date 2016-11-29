'use strict';

var expose = require('util/exposer')(module.exports),
    _ = require('lodash'),
    moment = require('moment');

moment.updateLocale('en', {
  relativeTime : {
    future: 'in %s',
    past:   '%s ago',
    s:  'sec',
    m:  '1 min',
    mm: '%d min',
    h:  '1 hr',
    hh: '%d hr',
    d:  'a day',
    dd: '%d days',
    M:  'a month',
    MM: '%d months',
    y:  'a year',
    yy: '%d years'
  }
});

var msIn = {};
msIn.second = 1000;
msIn.minute = msIn.second * 60;
msIn.hour   = msIn.minute * 60;
msIn.day    = msIn.hour   * 24;
msIn.week   = msIn.day    * 7;
msIn.month  = msIn.day    * 30;
msIn.year   = msIn.month  * 12;

expose(msIn);

expose(parse);
function parse(d) {
  return moment(new Date(d));
}

expose(inMs);
function inMs(t) {
  return parse(t).unix();
}

expose(prettyDate);
function prettyDate(time) {
  return parse(time).format('h:mm a MMM DD, YYYY');
}

expose(shortDate);
function shortDate(time) {
  return parse(time).format('MM/DD-hh:mm.ss');
}

expose(timeInFormat);
function timeInFormat(time, format) {
  return parse(time).format(format);
}

expose(relative);
function relative(time) {
  return parse(time).fromNow();
}

expose(smartDate);
function smartDate(time) {
  var timePassed = timeBetween(time, Date.now());
  if (timePassed < msIn.hour) {
    return relative(time);
  } else if (timePassed < msIn.day) {
    return timeInFormat(time, 'h:mm a');
  } else if (timePassed < msIn.week) {
    return timeInFormat(time, 'ddd M/DD');
  } else {
    return timeInFormat(time, 'l');
  }
}

expose(timeBetween);
function timeBetween(t1, t2) { // +: t1 before t2 (chronological)
  return parse(t2).diff(parse(t1));  // -: t2 before t1
}

expose(min);
function min(t1, t2) {
  return timeBetween(t1, t2) > 0 ? t1 : t2;
}

expose(max);
function max(t1, t2) {
  return timeBetween(t1, t2) > 0 ? t2 : t1;
}

expose(subtract);
function subtract(t, amount) {
  return parse(t).subtract(amount, 'ms');
}

expose(add);
function add(t, amount) {
  return parse(t).add(amount, 'ms');
}

expose(chronoByTime);
function chronoByTime(list) {
  return _.sortBy(list, function(item) {
    return (new Date(item.time)).getTime();
  });
}

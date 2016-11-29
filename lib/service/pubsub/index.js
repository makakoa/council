'use strict';

var _ = require('lodash'),
    exposer = require('util/exposer'),
    assert = require('util/assert'),
    config = require('config').pubnub,
    Promise = require('util/promise'),
    PubNub = require('pubnub');

// API as per: https://www.pubnub.com/docs/javascript/api-reference-sdk-v4

module.exports = function pubsubClient(opts) {
  var expose = exposer();

  var pubnub = new PubNub(_.extend(
    {},
    _.pick(config, 'publishKey','subscribeKey'),
    opts
  ));


  expose(subscribe);
  function subscribe(channels, opts) {
    assert(channels, 'Cannot subscribe to ' + channels);
    console.log('Subscribing to ', channels);
    pubnub.subscribe(_.extend({
      channels: _.isArray(channels) ? channels : [channels]
    }, opts || {}));
  }

  expose(unsubscribe);
  function unsubscribe(channels) {
    pubnub.unsubscribe({
      channels: _.isArray(channels) ? channels : [channels]
    });
  }

  expose({
    setUUID: pubnub.setUUID,
    hereNow: pubnub.hereNow,
    setState: pubnub.setState,
    addListener: pubnub.addListener
  });

  expose(onMessage);
  function onMessage(fn) {
    pubnub.addListener({
      message: fn
    });
  }

  expose(onStatus);
  function onStatus(fn) {
    pubnub.addListener({
      status: fn
    });
  }

  expose(onPresence);
  function onPresence(fn) {
    pubnub.addListener({
      presence: fn
    });
  }

  expose(publish);
  function publish(channel, message) {
    pubnub.publish({
      channel: channel,
      message: message
    }, function(status) {
      console.log(
        'pub ',
        channel,
        message,
        status.statusCode
      );
    });
  }

  function getDeviceChannels(device) {
    return new Promise(function(res, rej) {
      pubnub.push.listChannels({
        device: device.token,
        pushGateway: device.type
      }, function (status, response) {
        if (status.error) rej(status);
        if (!response) res([]);
        res(response.channels);
      });
    });
  }

  function addDeviceChannel(device, channel) {
    return new Promise(function(res, rej) {
      pubnub.push.addChannels({
        channels: [channel],
        device: device.token,
        pushGateway: device.type
      }, function(status) {
        if (status.error) rej(status);
        res();
      });
    });
  }

  function removeDeviceChannels(device, channels) {
    return new Promise(function(res, rej) {
      pubnub.push.removeChannels({
        channels: channels,
        device: device.token,
        pushGateway: device.type
      }, function(status) {
        if (status.error) rej(status);
        res();
      });
    });
  }

  expose(setDeviceChannel);
  function setDeviceChannel(device, channel) {
    return getDeviceChannels(device).then(function(channels) {
      return Promise.all([
        _.includes(channels, channel)
          ? null
          : addDeviceChannel(device, channel),
        _.without(channels, channel).length > 0
          ? removeDeviceChannels(device, _.without(channels, channel))
          : null
      ]).catch(function(err) {
        console.error('Could not set device channels', err, device);
      });
    });
  }

  return expose();

};

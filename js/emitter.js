'use strict';

const _ = require('lodash');

/**
http://michd.me/blog/event-driven-javascript-a-simple-event-dispatcher/

For each EventSubscriptions[eventName] => [ { callback1 }, { callback2 } ...]
trigger(eventName, data, context) where data is array of [arg1, arg2]
**/

function CustomDispatcher() {
  this.EventSubscriptions = {};
}

CustomDispatcher.prototype = {

  /**
  * Register a listener that provides context and callback function for an event. 
  **/
  subscribe: function(eventName, context, callback) {
    if (typeof this.EventSubscriptions[eventName] === 'undefined') {
      this.EventSubscriptions[eventName] = [];
    }
    let subscribers = this.EventSubscriptions[eventName];
    var subscriber = {
      context: context,
      callback: callback
    };
    console.log("subscribe!", subscriber);
    subscribers.push(subscriber);

    return subscriber;
  },

  /**
  * Trigger all registered subscribers for an event.
  *
  * @param eventName: the event key
  * @param data: array of args
  * @param context: the context calling the callback
  **/
  trigger: function(eventName, data) {
    let subscribers = this.EventSubscriptions[eventName]; 
    console.log("triggered: " + eventName, subscribers);
    if (!subscribers || _.isEmpty(subscribers)) {
      return; // return early if no context, or undefined or empty array
    }

    // Ensure data is an array or is wrapped in an array
    data = (data instanceof Array) ? data : [data];

    var i;
    for (i = 0; i < subscribers.length; i++) {
      var subscriber = subscribers[i];
      subscriber.callback.apply(subscriber.context, data);
    }
  },

  unsubscribe: function(subscriber) {

  }
}

module.exports = new CustomDispatcher();

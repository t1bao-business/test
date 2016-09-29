'use strict';

/**
 * @ngdoc service
 * @name merchantApp.storage
 * @description
 * # storage
 * Service in the merchantApp.
 */
angular.module('merchantApp')
  .service('storage', function () {
    // AngularJS will instantiate a singleton by calling "new" on this function
    var storage = {};
    return {
      set: function (k, v) {
        storage[k] = v;
        if (window.localStorage) {
          window.localStorage.setItem(k, JSON.stringify(v));
        }
      },
      get: function (k) {
        if (storage[k]) {
          return storage[k];
        }
        if (window.localStorage) {
          var v = window.localStorage.getItem(k);
          v = JSON.parse(v);
          return v;
        }
      }
    };
  });

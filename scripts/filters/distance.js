'use strict';

/**
 * @ngdoc filter
 * @name merchantApp.filter:distance
 * @function
 * @description
 * # distance
 * Filter in the merchantApp.
 */
angular.module('merchantApp')
  .filter('distance', function () {
    return function (input) {
      return 'distance filter: ' + input;
    };
  });

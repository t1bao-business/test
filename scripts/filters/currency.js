'use strict';

/**
 * @ngdoc filter
 * @name merchantApp.filter:currency
 * @function
 * @description
 * # currency
 * Filter in the merchantApp.
 */
angular.module('merchantApp')
  .filter('currency', function () {
    return function (input) {
      input = parseFloat(input).toFixed(2);
      if (isNaN(input)) {
        input = 0.0;
      }
      return parseFloat(input).toFixed(2);
    };
  });

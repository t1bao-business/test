'use strict';

/**
 * @ngdoc filter
 * @name merchantApp.filter:date
 * @function
 * @description
 * # date
 * Filter in the merchantApp.
 */
angular.module('merchantApp')
  .filter('date', function () {
    return function (input) {
      var time = new Date(input);
      return moment(time).format('YYYY-MM-DD hh:mm:ss');
    };
  });

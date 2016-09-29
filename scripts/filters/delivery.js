'use strict';

/**
 * @ngdoc filter
 * @name merchantApp.filter:delivery
 * @function
 * @description
 * # delivery
 * Filter in the merchantApp.
 */
angular.module('merchantApp')
  .filter('delivery', function () {
    return function (input) {
      switch (input) {
        case 'self':
          return '自提';
        case 'express':
          return '快递';
        default:
          return '不明错误';
      }
    };
  });

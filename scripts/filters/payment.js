'use strict';

/**
 * @ngdoc filter
 * @name merchantApp.filter:payment
 * @function
 * @description
 * # payment
 * Filter in the merchantApp.
 */
angular.module('merchantApp')
  .filter('payment', function () {
    return function (input) {
      switch (input) {
        case 'online':
          return '在线支付';
        case 'onsite':
          return '货到付款';
        default:
          return '不明错误';
      }
    };
  });

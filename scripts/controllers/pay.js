'use strict';
/**
 * @ngdoc function
 * @name merchantApp.controller:PayCtrl
 * @description
 * # PayCtrl
 * Controller of the merchantApp
 */
angular.module('merchantApp').controller('PayCtrl', function ($scope) {
  $scope.module = 'grocery';
  $scope.$on('$includeContentLoaded', function () {
    $scope.module = 'grocery';
  });
});

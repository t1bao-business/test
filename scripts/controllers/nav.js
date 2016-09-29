'use strict';

/**
 * @ngdoc function
 * @name merchantApp.controller:NavCtrl
 * @description
 * # NavCtrl
 * Controller of the merchantApp
 */
angular.module('merchantApp')
  .controller('NavCtrl', function ($scope, $location, api, user) {
    api.send('user/profile', null, function (data) {
      if (data && 'code' in data) {
        if (data.name === 'Success') {
          console.log(data);
          $scope.user = data.data;
          user.set(data.data);
        }
      }
    });
    $scope.exit = function () {
      api.send('user/logout', null, function (data) {
        if (data && 'code' in data) {
          if (data.name === 'Success') {
            $location.path('user/login');
          }
        }
      });
    };
  });

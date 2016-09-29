'use strict';

/**
 * @ngdoc function
 * @name merchantApp.controller:SubscribedCtrl
 * @description
 * # SubscribedCtrl
 * Controller of the merchantApp
 */
angular.module('merchantApp')
  .controller('SubscribedCtrl', function ($scope, $route, api) {
    $scope.$on('$includeContentLoaded', function () {
      $scope.module = 'subscribed';
      $scope.total = 0;
      $scope.page = 0;
      api.send('user/profile', null, function (data) {
        if (data && 'code' in data) {
          if (data.name === 'Success') {
            console.log(data);
            $scope.user = data.data;
          }
        }
      });
    });

    var page = parseInt($route.current.params.page);
    if (!page || page < 1) {
      page = 1;
    }

    api.send('subscribed/list', {
      page: page
    }, function (data) {
      console.log(data);
      switch (data.name) {
        case 'Success':
          $scope.subscibed = data.data.results;
          $scope.total = data.data.total;
          $scope.count = data.data.count;
          $scope.page = data.data.page;
          break;
      }
    });
  });

'use strict';

/**
 * @ngdoc function
 * @name merchantApp.controller:PreviewCtrl
 * @description
 * # PreviewCtrl
 * Controller of the merchantApp
 */
angular.module('merchantApp')
  .controller('PreviewCtrl', function ($scope, $location, $route, preview) {
    console.log($route.current.$$route.originalPath);
    var page = 1;
    $scope.module = 'grocery';
    $scope.listed = false;
    $scope.getCategory = function (category) {
      $scope.column = 'default';
      $scope.listed = false;

      function getMerchandises(page) {
        var options = {
          page: page
        };
        if (category.id) {
          options.category = category.id;
        }
        preview.merchandise(options, function (data) {
          if (page === 1) {
            $scope.merchandises = data.results;
          } else {
            $scope.merchandises = $scope.merchandises.concat(data.results);
          }
          $scope.listed = true;
        });
      }
      page = 1;
      $scope.merchandises = [];

      if (!category) {
        category = {
          id: 0
        };
      }

      $('.list-group-item.active')
        .removeClass('active');
      $('.list-group-item')
        .each(function () {
          var id = $(this)
            .attr('id');
          if (id === 'category-' + category.id) {
            $(this)
              .addClass('active');
          }
        });
      getMerchandises(page);
    };

    switch ($route.current.$$route.originalPath) {
      case '/preview/home':
        $scope.column = 'default';
        preview.category(page, function (data) {
          console.log(data);
          $scope.fetched = true;
          $scope.infoList = true;
          $scope.categories = data.results;
        });
        $scope.getCategory();

        break;
      case '/preview/profile':
        $scope.column = 'profile';
        preview.profile(function (data) {
          console.log(data);
          $scope.profiled = true;
          $scope.fetched = true;
          $scope.grocery = data;

        });
        break;
      case '/preview/comments':
        $scope.column = 'comments';
        preview.comments(page, function () {
          $scope.fetched = true;
          $scope.comments = true;
        });
        break;
    }

    $scope.showInfo = function () {
      $scope.column = 'default';
      $location.path('preview/home');
    };

    $scope.showProfile = function () {
      $scope.column = 'profile';
      $location.path('preview/profile');
    };

    $scope.showComments = function () {
      $scope.column = 'comments';
      $location.path('preview/comments');
    };
  });

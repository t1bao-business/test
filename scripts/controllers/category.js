'use strict';

/**
 * @ngdoc function
 * @name merchantApp.controller:CategoryCtrl
 * @description
 * # CategoryCtrl
 * Controller of the merchantApp
 */
angular.module('merchantApp')
  .controller('CategoryCtrl', function ($scope, $route, $location, api, storage, category) {
    $scope.type = 'category';
    var page = parseInt($route.current.params.page);
    if (!page || page < 1) {
      page = 1;
    }

    function list(page) {
      category.list(page, function (data) {
        $scope.categories = data.results;
        storage.set('categories', $scope.categories);

        $scope.total = data.total;
        $scope.page = data.page;
      });
    }

    $scope.$on('$includeContentLoaded', function () {
      $scope.module = 'merchandise';

      category.initScroll('.category-list', function () { }, function (data) {
        if (data) {
          $scope.categories = $scope.categories.concat(data.results);
          storage.set('categories', $scope.categories);
          $scope.total = data.total;
          $scope.page = data.page;
        }
      }, page + 1);

    });


    switch ($route.current.$$route.originalPath) {
      case '/category/home':
        list(page);
        break;
      case '/category/edit/:id':
        var id = null;
        try {
          id = parseInt($route.current.params.id);
        } catch (e) {
          $location.path('/category/0/list/' + page);
        }
        var categories = storage.get('categories');
        console.log(categories);

        if (!categories) {
          $location.path('/category/0/list/' + page);
          return;
        }
        var found = false;
        for (var i = 0; i < categories.length; i++) {
          if (id === categories[i].id) {
            $scope.category = categories[i];
            console.log($scope.category);
            found = true;
            break;
          }
        }
        break;
      case '/category/add/':
        return;
      default:
        list(page);
        break;

    }

    $scope.openAdd = function () {
      $('.subcategory.add')[0].reset();
    };


    $scope.add = function () {
      var formData = new FormData($('form.add')[0]);
      console.log(formData);
      category.add(formData);
    };

    $scope.openModify = function (category) {
      $scope.category = category;
    };

    $scope.remove = function (category) {
      if (!confirm('操作不可恢复，你确定要删除吗？')) {
        return;
      }
      api.send('category/remove', {
        id: category.id
      }, function (data) {
        console.log(data);
        if (data.name === 'Success') {
          list(page);
        }
      });
    };

    $scope.update = function () {
      var formData = new FormData($('form.update')[0]);
      category.update(formData);
    };

    $scope.search = function () {
      console.log('search');
      console.log('q = ' + $scope.q);
      if ($scope.q) {
        category.inputSearch($scope.q, page, function (data) {
          if (data) {
            $scope.queries = data.results;
            $scope.total = data.total;
            $scope.page = data.page;
          }
        });
      } else {
        $scope.queries = [];
        $scope.total = 0;
        $scope.page = 0;
      }
    };

    $scope.online = function (category) {
      api.send('category/online', {
        id: category.id,
        online: true
      }, function (data) {
        console.log(data);
        if (data.name === 'Success') {
          category.online = true;
        }
      });
    };

    $scope.offline = function (category) {
      api.send('category/online', {
        id: category.id,
        online: false
      }, function (data) {
        console.log(data);
        if (data.name === 'Success') {
          category.online = false;
        }
      });
    };

  });

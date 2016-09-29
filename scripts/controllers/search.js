'use strict';

/**
 * @ngdoc function
 * @name merchantApp.controller:NavCtrl
 * @description
 * # NavCtrl
 * Controller of the merchantApp
 */
angular.module('merchantApp')
  .controller('SearchCtrl', function ($scope, $route, $document, $location,
    merchandise, category, order) {
    $scope.$on('$includeContentLoaded', function () {
      $scope.module = 'grocery';
    });
    var page = parseInt($route.current.params.page) || 0;
    var type = $route.current.params.type;
    var q = decodeURIComponent($route.current.params.q || '');
    $scope.q = q;
    $scope.searching = false;

    // var keyTimer;

    function refresh(q, page) {

      switch (type) {
        case 'category':
          $scope.type = '分类';
          if (q) {
            $scope.searching = true;

            category.inputSearch(q, page, function (data) {
              $scope.searching = false;
              if (data) {
                $scope.categories = data.results;
                $scope.total = data.total;
                $scope.page = data.page;
              }
            });
          }
          break;
        case 'merchandise':
          $scope.type = '商品';
          if (q) {
            $scope.searching = true;
            merchandise.inputSearch(q, page, function (data) {
              $scope.searching = false;

              if (data) {
                $scope.merchandises = data.results;
                $scope.total = data.total;
                $scope.page = data.page;
              }
            });
          }
          break;
        case 'order':
          $scope.type = '订单';
          if (q) {
            $scope.searching = true;
            order.query({
              no: q,
              page: page
            }, function (error, data) {
              $scope.searching = false;
              console.log(data);
              if (data) {
                $scope.orders = data.results;
                $scope.total = data.total;
                $scope.page = data.page;
              }
            });
          }
          break;
      }
    }
    refresh();
    $scope.search = function () {
      var q = encodeURIComponent($document.find('#q').val());
      console.log(q);
      var url = '/search/' + type + '/' + q + '/1';
      $location.path(url);
    };

    $scope.showItem = function (id) {
      console.log(id);
      $document.find('#list-' + id).show();
      $document.find('#list-' + id).removeClass('hidden');
      $document.find('#hide-item-' + id).show();
      $document.find('#hide-item-' + id).removeClass('hidden');
      $document.find('#show-item-' + id).hide();
    };

    $scope.hideItem = function (id) {
      console.log(id);
      $document.find('#list-' + id).hide();
      $document.find('#hide-item-' + id).hide();
      $document.find('#show-item-' + id).show();
    };
    $scope.onChange = function () {
      console.log('start new timer');
      var query = $document.find('#q').val();
      if (query) {
        refresh(query, page);
        // keyTimer = setTimeout(function () {
        //   clearTimeout(keyTimer);
        //   keyTimer = null;
        // }, 1000);
      }
    };

    $scope.online = function (data) {
      switch (type) {
        case 'category':
          category.online(data);
          break;
        case 'merchandise':
          merchandise.online(data);
          break;
      }
    };

    $scope.offline = function (data) {
      switch (type) {
        case 'category':
          category.offline(data);
          break;
        case 'merchandise':
          merchandise.offline(data);
          break;
      }
    };

    $scope.remove = function (data) {
      if (!confirm('确定要删除吗?操作不可恢复!')) {
        return;
      }
      switch (type) {
        case 'category':
          category.remove(data, function () {
            $route.reload();
          });
          break;
        case 'merchandise':
          merchandise.offline(data, function () {
            $route.reload();
          });
          break;
      }
    };

    $scope.showTransState = function (item, state) {
      return order.changeable(item.state, state, item.delivery, item.payment);
    };

    $scope.showState = function (item, state) {
      return item.state === state;
    };

    $scope.showDetail = function (order) {
      console.log('showDetail');
      var id = '#order-detail-' + order.no;
      var show = '#order-detail-show-' + order.no;
      var hide = '#order-detail-hide-' + order.no;
      $(id).removeClass('hidden');
      $(show).addClass('hidden');
      $(hide).removeClass('hidden');

    };
    $scope.hideDetail = function (order) {
      console.log('hideDetail');
      var id = '#order-detail-' + order.no;
      var show = '#order-detail-show-' + order.no;
      var hide = '#order-detail-hide-' + order.no;
      $(id).addClass('hidden');
      $(show).removeClass('hidden');
      $(hide).addClass('hidden');
    };

  });

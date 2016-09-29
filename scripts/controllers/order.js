'use strict';

/**
 * @ngdoc function
 * @name merchantApp.controller:OrderCtrl
 * @description
 * # OrderCtrl
 * Controller of the merchantApp
 */

angular.module('merchantApp')
  .controller('OrderCtrl', function ($scope, $route, $location, api, order) {

    //定义订单状态
    var states = order.getStates();
    console.log(states);
    var days = order.getDays();
    $scope.states = states;
    $scope.days = days;

    var params = $route.current.params || {};
    var page = parseInt(params.page);
    if (!page || page < 1) {
      page = 1;
    }

    var state = params.state;
    var q = params.q;

    var options = {
      page: page
    };
    switch (state) {
      case 'created':
        $scope.title = '已创建订单';
        break;
      case 'accepted':
        $scope.title = '待处理订单';
        break;
      case 'delivered':
        $scope.title = '已发货订单';
        break;
      case 'received':
        $scope.title = '已创建订单';
        break;
      case 'cancelled':
        $scope.title = '已取消订单';
        break;
      case 'commented':
        $scope.title = '已评论订单';
        break;
      case 'finished':
        $scope.title = '已完成订单';
        break;
      default:
        $scope.title = '全部订单';
        break;
    }
    if (state === 'all') {
      state = null;
    }
    if (state) {
      options[state] = true;
    }

    for (var i = 0; i < states.length; i++) {
      if (states[i].value === state) {
        $scope.stateName = states[i].name;
      }
    }

    $scope.$on('$includeContentLoaded', function () {
      $scope.module = 'order';
      order.initScroll('.order-list', function () {
      }, function (error, data) {
        if (error) {
          console.error(data);
          return;
        }
        if (!data.results.length) {
          return;
        }
        $scope.orders = $scope.orders.concat(data.results);
        $scope.page = data.page;
        $scope.total = data.total;
        $scope.count = data.count;
        $scope.base = 'order';
      }, page, state, days);
    });



    function orderCallback(error, data) {
      if (error) {
        console.error(data);
        return;
      }
      $scope.progressing = false;

      $scope.orders = data.results;
      $scope.page = data.page;
      $scope.total = data.total;
      $scope.count = data.count;
      $scope.base = 'order';
    }

    function list(page, days) {
      $scope.progressing = true;
      $scope.orders = null;
      order.list(orderCallback, page, state, days);
    }

    function query(no, page) {
      order.query({
        no: no,
        page: page
      }, orderCallback);
    }

    function queryWithAdditions(q, page) {
      var options = {
        page: page,
        q: q
      };

      if (state) {
        options[state] = true;
      }
      order.query(options, orderCallback);
    }

    function updateState(id, state) {
      switch (state) {
        case 'CANCELLED':
          if (!confirm('你确定要取消订单吗？')) {
            return;
          }
          break;
        default:

      }
      order.state({
        id: id,
        state: state
      }, function (error, data) {
        console.log(error, data);
        if (error) {
          alert(error);
          $route.reload();
          return;
        }

        for (var i = 0; i < $scope.orders.length; i++) {
          if (data.id === $scope.orders[i].id) {
            $scope.orders[i] = data;
            break;
          }
        }
        $route.reload();
      });
    }

    switch ($route.current.$$route.originalPath) {
      case '/order/home':
        $scope.type = 'accepted';
        state = 'CREATED|PAID';
        list(page);
        break;
      case '/order/more':
        $scope.type = 'more';

        break;
      case '/order/state/:state/:page':
        $scope.type = $route.current.params.state;
        if ($scope.type === 'accepted') {
          state = 'CREATED|PAID';
        } else {
          state = $scope.type.toUpperCase();
        }
        if (!($scope.type === 'delivered' || $scope.type === 'finished')) {
          // $scope.type = 'more';
        }
        list(page);

        break;
      case '/order/list/:page':
      case '/order/:state/list/:page':
        list(page);
        break;
      case '/order/no/:q':
      case '/order/no/:q/:page':
        console.log('inside no');
        query(q, page);
        break;
      case '/order/query/:q/:page':
      case '/order/:state/query/:q/:page':
        queryWithAdditions(q, page);
        break;
    }

    $scope.cancel = function (order) {
      api.send('order/cancel', {
        id: order.id
      }, function (data) {
        console.log(data);
        switch (data.name) {
          case 'Success':
            console.log(data);
            list(page);
            break;
        }
      });
    };

    $scope.query = function () {
      var q = $scope.q || $('#q').val();
      console.log(q);

      if (q) {
        if (state) {
          $location.path('order/' + state + '/query/' + q + '/' + page);
        } else {
          $location.path('order/query/' + q + '/' + page);
        }
      }
    };

    $scope.no = function () {
      var q = $scope.q || $('#q').val();

      console.log('inside no');
      console.log(q);
      if (q) {
        $location.path('order/query/' + q + '/' + page);
      }
    };

    $scope.back = function () {
      $location.path('order/list/' + page);
    };

    $scope.selectState = function (state) {

      if (!state) {
        $location.path('order/list/1');
      } else {
        $location.path('order/' + state.value + '/list/1');
      }
    };

    $scope.selectDays = function (day) {
      if (day) {
        $scope.dayName = day.name;
        list(page, day.value);
      } else {
        $scope.dayName = null;
        list(page);
      }
    };

    $scope.state = updateState;

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
    $scope.pageUp = function () {
      if (page > 0) {
        page--;
        list(page);
      } else {
        $scope.upMost = true;
      }
    };
    $scope.pageDown = function () {
      $scope.upMost = false;
      page++;
      list(page);
    };
  });

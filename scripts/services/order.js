'use strict';

/**
 * @ngdoc service
 * @name merchantApp.order
 * @description
 * # order
 * Service in the merchantApp.
 */
angular.module('merchantApp')
  .service('order', function (api, scroll) {
    // AngularJS will instantiate a singleton by calling "new" on this function


    //States
    var states = [{
      name: '新订单',
      value: 'CREATED'
    }, {
        name: '已经付款',
        value: 'PAID'
      }, {
        name: '已经接受',
        value: 'ACCEPTED'
      }, {
        name: '已经发货',
        value: 'DELIVERED'
      }, {
        name: '已经签收',
        value: 'RECEIVED'
      }, {
        name: '已经评价',
        value: 'COMMENTED'
      }, {
        name: '已取消',
        value: 'CANCELLED'
      }, {
        name: '已经完成',
        value: 'FINISHED'
      }];
    //filter days
    var days = [{
      name: '今天',
      value: 1
    }, {
        name: '一星期内',
        value: 7
      }, {
        name: '10天内',
        value: 10
      }, {
        name: '30天内',
        value: 30
      }, {
        name: '3个月内',
        value: 90
      }, {
        name: '6个月内',
        value: 180
      }, {
        name: '1年内',
        value: 365
      },];
    return {
      getStates: function () {
        return states;
      },
      getDays: function () {
        return days;
      },
      initScroll: function (className, before, after, page, state, days) {
        var noData = false;

        var self = this;
        console.log('sindie scroll');
        console.log(className);
        scroll.bottom(className, function () {
          if (noData) {
            return;
          }
          before();
          page++;
          self.list(after, page, state, days);
        });
      },
      list: function (next, page, state, days) {
        var options = {
          page: page
        };

        if (state) {
          options.state = state;
        }

        if (days && !isNaN(days)) {
          options.days = days;
        }
        console.log(options);
        api.send('order/list', options, function (data) {
          console.log(data);
          switch (data.name) {
            case 'Success':
              next(false, data.data);
              break;
            default:
              next(true);
          }
        });
      },
      query: function (options, next) {
        if (options.no) {
          options.q = options.no;
          delete options.no;
        }
        api.send('order/query', options, function (data) {
          switch (data.name) {
            case 'Success':
              next(false, data.data);
              break;
            default:
              next(true);
              break;
          }
        });
      },
      state: function (options, next) {
        api.send('order/state', options, function (data) {
          console.log(data);
          switch (data.name) {
            case 'Success':
              next(false, data.data);
              break;
            default:
              next(true);
              break;
          }
        });
      },
      changeable: function (from, to, delivery, payment) {
        var switchPairs = {
          'CREATED': ['PAID', 'CANCELLED'],
          'PAID': ['ACCEPTED', 'CANCELLED'],
          'ACCEPTED': ['RECEIVED', 'CANCELLED'],
          'DELIVERED': ['RECEIVED', 'CANCELLED'],
          'RECEIVED': ['COMMENTED', 'FINISHED'],
          'COMMENTED': ['FINISHED']
        };
        if (delivery === 'self') {
          switchPairs.ACCEPTED = ['RECEIVED', 'CANCELLED'];
        } else {
          switchPairs.ACCEPTED = ['DELIVERED', 'CANCELLED'];
        }
        if (payment === 'onsite') {
          switchPairs.CREATED = ['ACCEPTED', 'CANCELLED'];
        }

        if (!switchPairs[from] || switchPairs[from].indexOf(to) === -1) {
          return false;
        }
        return true;
      }
    };
  });

'use strict';

/**
 * @ngdoc service
 * @name merchantApp.barcode
 * @description
 * # barcode
 * Service in the merchantApp.
 */
angular.module('merchantApp')
  .service('barcode', function (api, scroll) {
    // AngularJS will instantiate a singleton by calling "new" on this function
    return {
      list: function (page, cb) {
        api.send('barcode/list', {
          page: page
        }, function (data) {
          if (data.name === 'Success') {
            cb(data.data);
          } else {
            cb();
          }
        });
      },
      initScroll: function (className, before, after, page) {
        var noData = false;
        var self = this;
        console.log('sindie scroll');
        console.log(className);
        scroll.bottom(className, function () {
          if (noData) {
            return;
          }
          before();
          self.list(page++, function (data) {
            if (data.results.length < 1) {
              noData = true;
            }
            after(data);
          });
        });
      },
    };
  });

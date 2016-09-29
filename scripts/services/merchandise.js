'use strict';

/**
 * @ngdoc service
 * @name merchantApp.merchandise
 * @description
 * # merchandise
 * Service in the merchantApp.
 */
angular.module('merchantApp')
  .service('merchandise', function (api, scroll) {
    // AngularJS will instantiate a singleton by calling 'new' on this function
    var timer = null;

    return {
      initScroll: function (className, before, after, options) {
        var noData = false;

        var self = this;
        console.log('sindie scroll');
        console.log(className);
        scroll.bottom(className, function () {
          if (noData) {
            return;
          }
          before();
          options.page++;
          self.list(options, function (data) {
            if (data.results.length < 1) {
              noData = true;
            }
            after(data);
          });
        });
      },
      list: function (options, cb) {
        api.send('merchandise/list', options, function (data) {
          if (data.name === 'Success') {
            cb(data.data);
          } else {
            cb();
          }
        });
      },
      query: function (options, cb) {
        api.send('merchandise/query', options, function (data) {
          if (data.name === 'Success') {
            cb(data.data);
          } else {
            cb();
          }
        });
      },
      add: function (formData, cb) {
        api.send('merchandise/add', formData, function (data) {
          switch (data.name) {
            case 'Success':
              alert('添加成功！');
              break;
          }
          cb();
        });
      },
      inputSearch: function (q, page, cb) {
        var self = this;
        var options = { q: q };
        function query() {
          self.query(options, cb);
        }

        if (timer) {
          clearTimeout(timer);
        }
        timer = setTimeout(query, 3000);
      },
      online: function (sm, cb) {
        api.send('merchandise/online', {
          id: sm.merchandise.id,
          online: true
        }, function (data) {
          sm.online = true;
          if (data.name === 'Success') {
            if (cb) {
              cb();
            }
          }
        });
      },
      offline: function (sm, cb) {
        api.send('merchandise/online', {
          id: sm.merchandise.id,
          online: false
        }, function (data) {
          console.log(data);
          sm.online = false;
          if (data.name === 'Success') {
            if (cb) {
              cb();
            }
          }
        });
      },
      remove: function (sm, cb) {
        api.send('merchandise/remove', {
          id: sm.merchandise.id
        }, function (data) {
          switch (data.name) {
            case 'Success':
              if (cb) {
                cb();
              }
              break;
          }
        });
      }
    };
  });

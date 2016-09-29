'use strict';

/**
 * @ngdoc service
 * @name merchantApp.category
 * @description
 * # category
 * Service in the merchantApp.
 */
angular.module('merchantApp')
  .service('category', function (api, $location, scroll) {
    // AngularJS will instantiate a singleton by calling 'new' on this function
    var timer;
    return {
      list: function (page, cb) {
        api.send('category/list', {
          page: page
        }, function (data) {
          if (data.name === 'Success') {
            cb(data.data);
          } else {
            cb();
          }
        });
      },
      add: function (formData) {
        api.send('category/create', formData, function (data) {
          if (data.name === 'Success') {
            alert('添加成功！');
            $location.path('category/list');
          } else {
            alert('添加失败！ 原因：' + data.message);
          }
        });
      },
      update: function (formData) {
        api.send('category/update', formData, function (data) {
          console.log(data);
          if (data.name === 'Success') {
            alert('修改成功！');
            $location.path('/category/list');
          } else {
            alert('修改失败！ 原因：' + data.message);
          }
        });
      },
      query: function (options, cb) {
        api.send('category/query', options, function (data) {
          if (data.name === 'Success') {
            cb(data.data);
          } else {
            cb();
          }
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
      online: function (category, cb) {
        api.send('category/online', {
          id: category.id,
          online: true
        }, function (data) {
          console.log(data);
          if (data.name === 'Success') {
            category.online = true;
            if (cb) {
              cb();
            }
          }
        });
      },
      offline: function (category, cb) {
        api.send('category/online', {
          id: category.id,
          online: false
        }, function (data) {
          console.log(data);
          if (data.name === 'Success') {
            category.online = false;
            if (cb) {
              cb();
            }
          }
        });
      },
      remove: function (category, cb) {
        api.send('category/remove', {
          id: category.id
        }, function (data) {
          console.log(data);
          if (data.name === 'Success') {
            if (cb) {
              cb();
            }
          }
        });
      }
    };
  });

'use strict';

/**
 * @ngdoc service
 * @name merchantApp.preview
 * @description
 * # preview
 * Service in the merchantApp.
 */
angular.module('merchantApp')
  .service('preview', function (api) {
    // AngularJS will instantiate a singleton by calling "new" on this function
    return {
      category: function (page, cb) {
        api.send('preview/category', {
          page: page
        }, function (data) {
          if (data.name === 'Success') {
            cb(data.data);
          } else {
            cb();
          }
        });
      },
      profile: function (cb) {
        api.send('preview/profile', {
        }, function (data) {
          if (data.name === 'Success') {
            cb(data.data);
          } else {
            cb();
          }
        });
      },
      merchandise: function (data, cb) {
        api.send('preview/merchandise', data, function (data) {
          if (data.name === 'Success') {
            cb(data.data);
          } else {
            cb();
          }
        });
      },
      comments: function (page, cb) {
        cb();
      }
    };
  });

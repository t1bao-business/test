'use strict';

/**
 * @ngdoc service
 * @name merchantApp.api
 * @description
 * # api
 * Service in the merchantApp.
 */
angular.module('merchantApp')
  .service('api', function (url, $http, $location) {
    // AngularJS will instantiate a singleton by calling "new" on this function

    var fallback = 'user/login';
    var prefix;

    function makeUrl(path) {
      return url + prefix + path;
    }

    function requestHandler(path, data, fb, cb, innerPrefix, selfHandle) {
      var request;
      if (innerPrefix) {
        prefix = innerPrefix;
      } else {
        prefix = 'grocery/';
      }

      if (data) {
        if (data instanceof FormData) {
          request = $http.post(makeUrl(path), data, {
            withCredentials: true,
            headers: {
              'Content-Type': undefined
            }
          });
        } else {
          request = $http.post(makeUrl(path), data);
        }
      } else {
        request = $http.post(makeUrl(path));
      }
      fb = fb || fallback;
      request.success(function (data) {
        // this callback will be called asynchronously
        // when the response is available
        if (selfHandle) {
          return cb(data);
        }
        if ('name' in data) {
          switch (data.name) {
            case 'Success':
              cb(data);
              break;
            case 'NotLoggedIn':
            case 'MerchantNotLoggedIn':
            case 'UserNotLoggedIn':
              $location.path(fb);
              break;
            default:
              if (data.data) {
                cb(data);
              } else {
                alert(data.message);
              }
          }
        }
      }).
        error(function () {
          // called asynchronously if an error occurs
          // or server returns response with an error status.

          if (path === 'user/profile') {
            $location.path(fb);
          } else {
            var errorMsg = '请求错误，请检测网络。';
            //var string = 'Error request!';
            alert(errorMsg);
          }
        });
    }

    return {
      send: function (path, data, cb) {
        requestHandler(path, data, null, cb);
      },
      upload: function (path, data, cb) {
        $http.post(makeUrl(path), data, {
          withCredentials: true,
          headers: {
            'Content-Type': undefined
          },
          transformRequest: angular.identity
        }).success(function (data) {
          // this callback will be called asynchronously
          // when the response is available
          if (!('code' in data)) {

          } else if ('code' in data && !data.code) {
            cb(data);
          } else {
            switch (data.name) {
              case 'UserNotLogin':
                $location.path(fallback);
                break;
              default:
                alert(data.message);
            }
          }
        }).
          error(function () {
            // called asynchronously if an error occurs
            // or server returns response with an error status.

            $location.path(fallback);
          });
      },
      success: function (path, data, cb, noneSuccess) {
        requestHandler(path, data, null, function (data) {

          if (noneSuccess) {
            return cb(data);
          }
          if (data.name === 'Success') {
            cb(data);
          }
        });
      },
      selfSend: function (path, data, cb, mustSuccess, innerPrefix) {
        requestHandler(path, data, null, function (data) {
          if (!mustSuccess) {
            return cb(data);
          }
          if (data.name === 'Success') {
            cb(data);
          }
        }, innerPrefix, true);
      }
    };
  });

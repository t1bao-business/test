'use strict';

/**
 * @ngdoc service
 * @name merchantApp.user
 * @description
 * # user
 * Service in the merchantApp.
 */
angular.module('merchantApp')
  .service('user', function ($location, api) {
    // AngularJS will instantiate a singleton by calling "new" on this function
    var userData;
    var user = {
      set: function (aUser) {
        userData = aUser;
      },
      get: function () {
        return userData;
      },
      profile: function (scope) {
        api.send('user/profile', {}, function (data) {
          if (data.name === 'Success') {
            scope.user = data.data;
          }
        });
      },
      update: function (scope) {
        var formData = new FormData($('form.modify')[0]);
        api.send('user/update', formData, function (data) {
          console.log(data);
          if (data.name === 'Success') {
            alert('更新成功!');
            api.send('user/profile', {}, function (data) {
              if (data.name === 'Success') {
                scope.user = data.data;
              }
            });
          }
        });
      },
      login: function () {
        var formData = new FormData($('form')[0]);
        api.send('user/login', formData, function (data) {
          if (data.name === 'Success') {
            // alert('登录成功!');
            // $location.path('grocery/profile');
            $location.path('user/home');
          }
        });
      },
      logout: function () {
        api.send('user/logout', {}, function () {
          $location.path('user/login');
        });
      },
      feedback: function (formData) {
        api.send('user/feedback', formData, function (data) {
          if (data.name === 'Success') {
            alert('反馈成功!');
            // $location.path('grocery/profile');
            $location.path('user/home');
          } else {
            alert('反馈失败! 原因：' + data.message);
          }
        });
      },
      register: function (phone) {
        var formData = new FormData();
        formData.append('username', phone);
        formData.append('password', phone);
        formData.append('confirm', phone);
        formData.append('phone', phone);
        api.send('user/register', formData, function (data) {
          console.log(data);
          if (data.name === 'Success') {
            alert('注册成功!');
            $location.path('user/login');
          }
        });
      },
      captcha: function (captcha) {
        var formData = new FormData();
        formData.append('captcha', captcha);
        api.send('merchant/captcha', formData, function (data) {
          console.log(data);
          if (data.name === 'Success') {
            alert('注册成功!');
            $location.path('user/login');
          }
        });
      },
      password: {
        retrieve: function () {
          var formData = new FormData($('form')[0]);
          api.send('password/retrieve', formData, function (data) {
            console.log(data);
            if (data.name === 'Success') {
              alert('密码重置成功!');
              $location.path('user/login');
            }
          });
        },
        update: function () {
          var formData = new FormData($('form.password')[0]);
          api.send('password/update', formData, function (data) {
            console.log(data);
            if (data.name === 'Success') {
              alert('密码修改成功，请用新密码重新登录！');
              user.logout();
            } else {
              alert('密码修改失败，原因：' + data.data.reason);
            }
          });
        }
      }
    };
    return user;
  });

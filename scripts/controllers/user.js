'use strict';

/**
 * @ngdoc function
 * @name merchantApp.controller:UserCtrl
 * @description
 * # UserCtrl
 * Controller of the merchantApp
 */
angular.module('merchantApp')
  .controller('UserCtrl', function ($scope, $route, user, images, url, messages) {
    $scope.url = url;
    $scope.retrievePhone = true;
    $scope.$on('$includeContentLoaded', function () {
      $scope.module = 'user';
    });
    switch ($route.current.$$route.originalPath) {
      case '/user/login':
      case '/user/logout':
      case '/user/password/retrieve':
      case '/user/register':
        break;
      default:
        user.profile($scope);
        break;
    }
    $scope.register = user.register;

    $scope.login = user.login;
    $scope.logout = user.logout;

    $scope.retrieve = user.password.retrieve;

    $scope.updatePassword = user.password.update;

    $scope.modify = function () {
      user.update($scope);
    };

    $scope.fileChanged = function () {
      images.preview($('input[type=file][name=avatar]')[0].files, function (src) {
        $('img[name=image-logo]').attr('src', src);
      });
    };

    $scope.feedback = function () {
      var formData = new FormData($('form')[0]);

      user.feedback(formData);
    };

    //User Phone Registration

    $scope.getCaptcha = function () {
      if (!$scope.phone) {
        alert('请输入手机号！');
        return;
      }
      if (!validator.isMobilePhone($scope.phone, 'zh-CN')) {
        alert('手机号不正确');
        return;
      }
      $('.btn-get-sms-captcha').attr('disabled', 'disabled');
      $('.btn-get-sms-captcha').html('正在发送...');

      messages.captcha.phone({
        phone: $scope.phone
      }, function (data) {
        switch (data.name) {
          case 'Success':
            var seconds = 60;
            $('.btn-register').removeAttr('disabled');
            $('.btn-get-sms-captcha').html(seconds-- + '秒后重新发送');
            var interval = setInterval(function () {
              if (seconds <= 0) {
                $('.btn-get-sms-captcha').removeAttr('disabled');
                $('.btn-get-sms-captcha').html('重新获取验证码');
                clearInterval(interval);
                return;

              }
              $('.btn-get-sms-captcha').html(seconds-- + '秒后重新发送');
            }, 1000);
            break;
        }
      });
    };

    $scope.checked = false;
    $scope.fetching = false;
    $scope.captcha = false;
    var timer;
    $('.btn-get-sms-captcha').attr('disabled', 'disabled');
    $('.btn-get-email-captcha').attr('disabled', 'disabled');
    $('.btn-register').attr('disabled', 'disabled');
    $('[name=captchaImage]').keydown(function () {
      if (timer) {
        clearTimeout(timer);
      }
      timer = setTimeout(function () {
        var val = $('[name=captchaImage]').val();
        messages.captcha.check({
          captcha: val
        }, function (data) {
          $scope.captcha = true;
          switch (data.name) {
            case 'Success':
              $scope.checked = true;
              $('.btn-get-sms-captcha').removeAttr('disabled');
              $('.btn-get-email-captcha').removeAttr('disabled');

              break;
            default:
              $scope.checked = false;
              break;
          }
        });
      }, 1000);
    });
    $scope.updateImage = function () {
      var p = $('#image-captcha > span');
      var path = url + 'captcha/image?t=' + new Date();
      p.html('<img src="' + path + '"/>');
    };

    $scope.phoneRegister = function () {
      user.captcha($('[name=captchaSms]').val());
    };
  });

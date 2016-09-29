'use strict';

/**
 * @ngdoc function
 * @name merchantApp.controller:GroceryCtrl
 * @description
 * # GroceryCtrl
 * Controller of the merchantApp
 */
angular.module('merchantApp')
  .controller('GroceryCtrl', function ($scope, $route, $location, api, user, grocery, weixin) {
    var posSave;
    var mapped = false;
    $scope.module = 'grocery';
    switch ($route.current.$$route.originalPath) {
      case '/grocery/edit':
      case '/grocery/home':
      case '/grocery/settings':
        $scope.type = 'profile';
        grocery.profile(function (data) {
          if (data) {
            $scope.grocery = data;
          }
        });
        break;
      case '/grocery/location':
        $scope.type = 'location';
        $scope.notLoaded = grocery.notLoaded;
        grocery.getMap(function (map) {
          $scope.notLoaded = false;
          grocery.notLoaded = false;
          grocery.onMap(map, function (pos) {
            var lat = pos.lat();
            var lng = pos.lng();
            $('.latitude').html(lat);
            $('.longitude').html(lng);
            posSave = pos;
            mapped = true;
          });
          if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (position) {
              var latlng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
              map.panTo(latlng);
              if (!mapped) {
                mapped = true;
                map.setZoom(15);
              }
            }, function (error) {
              console.error('error occur');
              console.error(error);
            });
          }
        });

        break;
      default:
    }

    $scope.saveLocation = function () {
      if (posSave) {
        var position = {};
        position.latitude = posSave.lat();
        position.longitude = posSave.lng();
        position.altitude = 1;
        position.accuracy = 80;
        position.heading = 3;
        position.speed = 0;
        console.log(position);
        grocery.locationUpdate(position);
      } else {
        alert('尚未指定坐标！');
      }
    };

    $scope.modify = function () {
      var formData = new FormData($('form.modify')[0]);
      console.log(formData);
      grocery.update(formData, function (data) {
        if (data) {
          alert('更新成功!');
          $location.path('grocery/home');
        } else {
          alert('更新失败!');
        }
      });
    };

    $scope.disableDelivery = function () {
      var rows = ['delivery_fee', 'delivery_limit', 'delivery_distance'];

      for (var i = 0; i < rows.length; i++) {
        $scope.grocery[rows[i]] = 0.0;
      }
    };

    $scope.verfiy = function () {
      grocery.request(function () {
        alert('请求成功!');
      });
    };

    $scope.click = function (type) {
      switch (type) {
        case 'orders':
          $location.path('order/state/created/1');
          break;
        case 'position':
          $location.path('grocery/location');
          break;
        case 'category':
          $location.path('category/home');
          break;
        case 'payment':
          $location.path('payment/home');
          break;
        case 'settings':
          $location.path('grocery/settings');
          break;
        case 'barcode':
          $location.path('barcode/home');
          break;
        case 'merchandise':
          $location.path('merchandise/home');
          break;
        case 'feedback':
          $location.path('user/feedback');
          break;
        case 'search':
          $location.path('search/home');
          break;
        case 'preview':
          $location.path('preview/home');
          break;
        case 'share':
          if ($scope.grocery && $scope.grocery.id) {
            var url = 'http://grocery.t1bao.com/?id=' + $scope.grocery.id;
            var options = {
              title: $scope.grocery.name,
              link: url,
              imgUrl: $scope.grocery.logo,
              desc: $scope.grocery.intro
            };
            weixin.share('weixin', options);
          }
          break;
        default:
          alert('功能尚未开通,敬请期待!');
          break;
      }
    };

    $scope.scan = function _scan() {
      weixin.scan(function (data) {
        alert('扫描成功!' + data);
      });
    };

    $scope.refresh = function _refresh() {
      $window.location.reload();
    };
    $scope.online = function () {
      $scope.grocery.online = true;
      grocery.online(function () {
      });
    };
    $scope.offline = function () {
      $scope.grocery.online = false;
      grocery.offline(function () {
      });
    };
  });

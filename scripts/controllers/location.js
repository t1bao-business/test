'use strict';

/**
 * @ngdoc function
 * @name merchantApp.controller:LocationCtrl
 * @description
 * # LocationCtrl
 * Controller of the merchantApp
 */
angular.module('merchantApp')
  .controller('LocationCtrl', function ($scope, modal, api, map) {

    function update(point) {
      map.update(point);
    }
    $scope.$on('$includeContentLoaded', function () {
      $scope.module = 'location';

      map.setCallback(update);
      map.init();

      api.send('location/info', {}, function (data) {
        console.log(data);
        if (data.name === 'Success') {

          var point = data.data;
          $scope.latitude = point.latitude;
          $scope.longitude = point.longitude;
          //$scope.$apply();
          //map.removeOverlay(marker);
          //marker = updateMarker(map, point);
          console.log(point);
          map.update(point);

        } else {
          modal.alert(data.message, function () {

          });
        }
      });


      $scope.save = function () {

        if (!$scope.latitude) {
          modal.alert('经度没有指定!', function () {

          });
          return;
        }

        if (!$scope.longitude) {
          modal.alert('纬度没有指定!', function () {
          });
          return;
        }

        var position = {};
        position.latitude = $scope.latitude;
        position.longitude = $scope.longitude;
        position.altitude = 1;
        position.accuracy = 80;
        position.heading = 3;
        position.speed = 0;

        api.send('location/update', position, function (data) {
          console.log(data);
          if (data.name === 'Success') {
            modal.alert('位置更新成功！', function () {

            });
          } else {
            modal.alert(data.message, function () {

            });
          }
        });
      };
    });


    //function addMarkerListener(map, marker) {
    //  marker.addEventListener('dragend', function () {
    //    var point = marker.getPosition(); // 重新获取点坐标
    //    map.panTo(point);
    //    console.log(point);
    //    $scope.latitude = point.lat;
    //    $scope.longitude = point.lng;
    //    $scope.$apply();
    //
    //  });
    //}

    //function updateMarker(map, pos) {
    //  var point = new BMap.Point(pos.longitude, pos.latitude);
    //  var marker = new BMap.Marker(point);
    //  map.addOverlay(marker);
    //  addMarkerListener(map, marker);
    //  marker.enableDragging();
    //  map.panTo(point);
    //  map.setCenter(point);  // 初始化地图,设置中心点坐标和地图级别
    //  map.setZoom(15);
    //  return marker;
    //}

    //function init() {
    //  // 百度地图API功能
    //  map = new BMap.Map('map');    // 创建Map实例
    //
    //  var point = new BMap.Point(116.404, 39.915);
    //  marker = new BMap.Marker(point);
    //  map.addOverlay(marker);
    //  addMarkerListener(map, marker);
    //  marker.enableDragging();
    //  if (navigator.geolocation) {
    //    navigator.geolocation.getCurrentPosition(function (position) {
    //      var coords = position.coords;
    //      map.removeOverlay(marker);
    //
    //      marker = updateMarker(map, coords);
    //
    //    }, function () {
    //      console.log('insdie error');
    //    }, {
    //      // 指示浏览器获取高精度的位置，默认为false
    //      enableHighAcuracy: true,
    //      // 指定获取地理位置的超时时间，默认不限时，单位为毫秒
    //      timeout: 5000,
    //      // 最长有效期，在重复获取地理位置时，此参数指定多久再次获取位置。
    //      maximumAge: 3000
    //    });
    //  }
    //  map.centerAndZoom(point, 11);  // 初始化地图,设置中心点坐标和地图级别
    //  map.addControl(new BMap.NavigationControl());
    //  map.addControl(new BMap.ScaleControl());
    //  map.addControl(new BMap.MapTypeControl());
    //  map.addControl(new BMap.OverviewMapControl());
    //
    //  map.setCurrentCity('北京');          // 设置地图显示的城市 此项是必须设置的
    //  map.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放
    //
    //  /*
    //  map.addEventListener('dblclick', function(e) {
    //    console.log("inside dbl");
    //    map.removeOverlay(marker);
    //    marker = updateMarker(map, {longitude: e.point.lng, latitude: e.point.lat});
    //  });
    //  */
    //}
    //init();
  });

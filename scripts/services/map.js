// 'use strict';

// /**
//  * @ngdoc service
//  * @name merchantApp.api
//  * @description
//  * # api
//  * Service in the merchantApp.
//  */
// angular.module('merchantApp')
//   .service('map', function () {
//     // AngularJS will instantiate a singleton by calling "new" on this function
//     var map;
//     var marker;
//     var level = 11;

//     var callback = null;

//     function addMarkerListener(map, marker) {
//       marker.addEventListener('dragend', function () {
//         var point = marker.getPosition(); // 重新获取点坐标
//         map.panTo(point);
//         console.log(point);
//         if (callback instanceof Function) {
//           callback(point);
//         }
//       });
//     }

//     function updateMarker(map, pos) {
//       var point = new BMap.Point(pos.longitude, pos.latitude);
//       var marker = new BMap.Marker(point);
//       map.addOverlay(marker);
//       addMarkerListener(map, marker);
//       marker.enableDragging();
//       map.panTo(point);
//       map.setCenter(point);  // 初始化地图,设置中心点坐标和地图级别
//       map.setZoom(15);
//       return marker;
//     }

//     function init() {

//       // 百度地图API功能
//       map = new BMap.Map('map');    // 创建Map实例

//       var point = new BMap.Point(116.404, 39.915);
//       marker = new BMap.Marker(point);
//       map.addOverlay(marker);
//       addMarkerListener(map, marker);
//       marker.enableDragging();
//       if (navigator.geolocation) {
//         navigator.geolocation.getCurrentPosition(function (position) {
//           var coords = position.coords;
//           map.removeOverlay(marker);
//           marker = updateMarker(map, coords);

//         }, function () {
//           console.log('insdie error');
//         }, {
//           // 指示浏览器获取高精度的位置，默认为false
//           enableHighAcuracy: true,
//           // 指定获取地理位置的超时时间，默认不限时，单位为毫秒
//           timeout: 5000,
//           // 最长有效期，在重复获取地理位置时，此参数指定多久再次获取位置。
//           maximumAge: 3000
//         });
//       }
//       map.centerAndZoom(point, level);  // 初始化地图,设置中心点坐标和地图级别
//       map.addControl(new BMap.NavigationControl());
//       map.addControl(new BMap.ScaleControl());
//       map.addControl(new BMap.MapTypeControl());
//       map.addControl(new BMap.OverviewMapControl());

//       map.setCurrentCity('北京');          // 设置地图显示的城市 此项是必须设置的
//       map.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放

//       /*
//        map.addEventListener('dblclick', function(e) {
//        console.log("inside dbl");
//        map.removeOverlay(marker);
//        marker = updateMarker(map, {longitude: e.point.lng, latitude: e.point.lat});
//        });
//        */
//     }

//     return {
//       init: init,
//       update: function(point) {
//         map.removeOverlay(marker);
//         marker = updateMarker(map, point);
//       },
//       setCallback: function(cb) {
//         callback = cb;
//       }
//     };
//   });

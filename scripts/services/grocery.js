'use strict';

/**
 * @ngdoc service
 * @name merchantApp.grocery
 * @description
 * # grocery
 * Service in the merchantApp.
 */
angular.module('merchantApp')
  .service('grocery', function (api, NgMap) {
    // AngularJS will instantiate a singleton by calling "new" on this function
    function callback(cb) {
      return function (data) {
        if (data.name === 'Success') {
          cb(data.data);
        } else {
          cb();
        }
      };
    }
    var marker;
    var getMap = false;
    var timer;
    return {
      notLoaded: true,
      request: function (cb) {
        api.send('merchant/verify', {}, callback(cb));
      },
      profile: function (cb) {
        api.send('store/profile', {}, callback(cb));
      },
      update: function (formData, cb) {
        api.send('store/update', formData, callback(cb));
      },
      locationUpdate: function (position) {
        api.send('location/update', position, function (data) {
          if (data.name === 'Success') {
            alert('位置更新成功！');
          } else {
            alert(data.message);
          }
        });
      },
      getMap: function (cb) {
        function repeat() {
          NgMap.getMap().then(function (map) {
            if (!getMap) {
              getMap = true;
              cb(map);
              clearInterval(timer);
            }
          });
        }
        timer = setInterval(repeat, 1000);
      },
      onMap: function (map, cb) {
        if (!marker) {
          var pos = new google.maps.LatLng(34.7, 98.2);
          marker = new google.maps.Marker({
            map: map,
            position: pos
          });
          marker.setMap(map);
        }


        google.maps.event.addListener(map, 'click', function (e) {
          console.log(e.latLng);
          console.log(e.latLng.lat());
          console.log(e.latLng.lng());
          marker.setPosition(e.latLng);
          cb(e.latLng);
        });
      },
      online: function (cb) {
        api.send('online', {}, callback(cb));
      },
      offline: function (cb) {
        api.send('offline', {}, callback(cb));
      }
    };
  });

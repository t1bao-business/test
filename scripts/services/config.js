'use strict';

/**
 * @ngdoc service
 * @name merchantApp.config
 * @description
 * # config
 * Service in the merchantApp.
 */

var url = 'https://api.t1bao.com/';
// url = 'http://192.168.3.51:1339/';
// url = 'http://t1bao.localtunnel.me';
if (window.localStorage) {
  if (window.localStorage.getItem('url')) {
    url = window.localStorage.getItem('url');
  }
}

angular.module('merchantApp')
  .constant('url', url);

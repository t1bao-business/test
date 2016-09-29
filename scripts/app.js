'use strict';

/**
 * @ngdoc overview
 * @name merchantApp
 * @description
 * # merchantApp
 *
 * Main module of the application.
 */
angular
  .module('merchantApp', [
    'ngRoute',
    'ngMap'
  ])
  .config(function ($routeProvider, $httpProvider) {
    $httpProvider.defaults.useXDomain = true;
    $httpProvider.defaults.withCredentials = true;
    $routeProvider
      .when('/', {
        templateUrl: 'views/user/login.html',
        controller: 'UserCtrl'
      })
      .when('/user/feedback', {
        templateUrl: 'views/user/feedback.html',
        controller: 'UserCtrl'
      })
      .when('/user/home', {
        templateUrl: 'views/user/home.html',
        controller: 'UserCtrl'
      })
      .when('/user/about', {
        templateUrl: 'views/user/about.html',
        controller: 'UserCtrl'
      })
      .when('/user/login', {
        templateUrl: 'views/user/login.html',
        controller: 'UserCtrl'
      })
      .when('/user/register', {
        templateUrl: 'views/user/register.html',
        controller: 'UserCtrl'
      })
      .when('/user/profile', {
        templateUrl: 'views/user/profile.html',
        controller: 'UserCtrl'
      })
      .when('/user/password/retrieve', {
        templateUrl: 'views/password/retrieve.html',
        controller: 'UserCtrl'
      })
      .when('/user/password', {
        templateUrl: 'views/user/password.html',
        controller: 'UserCtrl'
      })
      .when('/user/dashboard', {
        templateUrl: 'views/user/dashboard.html',
        controller: 'UserCtrl'
      })
      .when('/merchandise/home', {
        templateUrl: 'views/merchandise/home.html',
        controller: 'MerchandiseCtrl'
      })
      .when('/merchandise/more', {
        templateUrl: 'views/merchandise/more.html',
        controller: 'MerchandiseCtrl'
      })
      .when('/merchandise/search', {
        templateUrl: 'views/merchandise/search.html',
        controller: 'MerchandiseCtrl'
      })
      .when('/merchandise/category/:id', {
        templateUrl: 'views/merchandise/home.html',
        controller: 'MerchandiseCtrl'
      })
      .when('/merchandise/add', {
        templateUrl: 'views/merchandise/add.html',
        controller: 'MerchandiseCtrl'
      })
      .when('/merchandise/edit/:id', {
        templateUrl: 'views/merchandise/edit.html',
        controller: 'MerchandiseCtrl'
      })
      .when('/merchandise/list/:page', {
        templateUrl: 'views/merchandise/list.html',
        controller: 'MerchandiseCtrl'
      })
      .when('/merchandise/:category/:ordering/:online/:action/:id/:page', {
        templateUrl: 'views/merchandise/add.html',
        controller: 'MerchandiseCtrl'
      })
      .when('/merchandise/:category/:ordering/:online/list/:page', {
        templateUrl: 'views/merchandise/list.html',
        controller: 'MerchandiseCtrl'
      })
      .when('/merchandise/:category/:ordering/:online/q/:query/:page', {
        templateUrl: 'views/merchandise/query.html',
        controller: 'MerchandiseCtrl'
      })
      .when('/merchandise/:category/:ordering/:online/q/:query/list/:page', {
        templateUrl: 'views/merchandise/query.html',
        controller: 'MerchandiseCtrl'
      })
      .when('/grocery/home', {
        templateUrl: 'views/grocery/home.html',
        controller: 'GroceryCtrl'
      })
      .when('/grocery/settings', {
        templateUrl: 'views/grocery/settings.html',
        controller: 'GroceryCtrl'
      })
      .when('/grocery/edit', {
        templateUrl: 'views/grocery/edit.html',
        controller: 'GroceryCtrl'
      })
      .when('/grocery/location', {
        templateUrl: 'views/grocery/location.html',
        controller: 'GroceryCtrl'
      })

      // Previews
      .when('/preview/home', {
        templateUrl: 'views/preview/home.html',
        controller: 'PreviewCtrl'
      })
      .when('/preview/profile', {
        templateUrl: 'views/preview/home.html',
        controller: 'PreviewCtrl'
      })
      .when('/preview/comments', {
        templateUrl: 'views/preview/home.html',
        controller: 'PreviewCtrl'
      })
      // .when('/grocery/profile', {
      //   templateUrl: 'views/grocery/profile.html',
      //   controller: 'GroceryCtrl'
      // })
      .when('/barcode/list/:page', {
        templateUrl: 'views/barcode/list.html',
        controller: 'BarcodeCtrl'
      })
      .when('/barcode/home', {
        templateUrl: 'views/barcode/home.html',
        controller: 'BarcodeCtrl'
      })

      //Payment 
      .when('/pay/home', {
        templateUrl: 'views/pay/home.html',
        controller: 'PayCtrl'
      })
      .when('/payment/home', {
        templateUrl: 'views/pay/home.html',
        controller: 'PayCtrl'
      })
      .when('/order/home', {
        templateUrl: 'views/order/home.html',
        controller: 'OrderCtrl'
      })
      .when('/order/:state/list/:page', {
        templateUrl: 'views/order/list.html',
        controller: 'OrderCtrl'
      })
      .when('/order/query/:q/:page', {
        templateUrl: 'views/order/list.html',
        controller: 'OrderCtrl'
      })
      .when('/order/:state/query/:q/:page', {
        templateUrl: 'views/order/list.html',
        controller: 'OrderCtrl'
      })
      // .when('/order/no/:q', {
      //   templateUrl: 'views/order/list.html',
      //   controller: 'OrderCtrl'
      // })
      // .when('/order/no/:q/:page', {
      //   templateUrl: 'views/order/list.html',
      //   controller: 'OrderCtrl'
      // })
      .when('/subscribed/list', {
        templateUrl: 'views/subscribed/list.html',
        controller: 'SubscribedCtrl'
      })
      .when('/subscribed/list/:page', {
        templateUrl: 'views/subscribed/list.html',
        controller: 'SubscribedCtrl'
      })

      // Search

      .when('/search/home', {
        templateUrl: 'views/search/home.html',
        controller: 'SearchCtrl'
      })
      .when('/search/:type/:q/:page', {
        templateUrl: 'views/search/type.html',
        controller: 'SearchCtrl'
      })
      .when('/search/:type', {
        templateUrl: 'views/search/type.html',
        controller: 'SearchCtrl'
      })
      // .when('/search/order/:q/:page', {
      //   templateUrl: 'views/search/order.html',
      //   controller: 'SearchCtrl'
      // })
      // .when('/search/merchandise', {
      //   templateUrl: 'views/search/merchandise.html',
      //   controller: 'SearchCtrl'
      // })
      // .when('/search/merchandise/:q/:page', {
      //   templateUrl: 'views/search/merchandise.html',
      //   controller: 'SearchCtrl'
      // })
      // .when('/search/category', {
      //   templateUrl: 'views/search/category.html',
      //   controller: 'SearchCtrl'
      // })
      // .when('/search/category/:q/:page', {
      //   templateUrl: 'views/search/category.html',
      //   controller: 'SearchCtrl'
      // })

      // Category 
      .when('/category/:parent/list/:id', {
        templateUrl: 'views/category/list.html',
        controller: 'CategoryCtrl'
      })
      .when('/category/list', {
        templateUrl: 'views/category/list.html',
        controller: 'CategoryCtrl'
      })
      .when('/category/list/:id', {
        templateUrl: 'views/category/list.html',
        controller: 'CategoryCtrl'
      })
      .when('/category/edit/:id', {
        templateUrl: 'views/category/edit.html',
        controller: 'CategoryCtrl'
      })
      .when('/category/add', {
        templateUrl: 'views/category/add.html',
        controller: 'CategoryCtrl'
      })
      .when('/category/search', {
        templateUrl: 'views/category/search.html',
        controller: 'CategoryCtrl'
      })
      .when('/category/home', {
        templateUrl: 'views/category/home.html',
        controller: 'CategoryCtrl'
      })
      .when('/pay', {
        templateUrl: 'views/pay/main.html',
        controller: 'PayCtrl'
      })
      .otherwise({ redirectTo: '/user/login' });
  });

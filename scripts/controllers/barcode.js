'use strict';

/**
 * @ngdoc function
 * @name merchantApp.controller:BarcodeCtrl
 * @description
 * # BarcodeCtrl
 * Controller of the merchantApp
 */
angular.module('merchantApp')
  .controller('BarcodeCtrl', function ($route, $scope, api, barcode) {
    var module = 'merchandise';
    $scope.type = 'barcode';
    $scope.page = 0;
    $scope.total = 0;
    $scope.base = 'barcode';
 
    var page = parseInt($route.current.params.page);

    $scope.$on('$includeContentLoaded', function () {
      $scope.module = module;
      console.log('inside barcode list');
      barcode.initScroll('.barcode-list', function () { }, function (data) {
        if (data) {
          $scope.barcodes = $scope.barcodes.concat(data.results);
          $scope.page = data.page;
          $scope.total = data.total;
        }
      }, 2);
      // api.send('user/profile', null, function(data) {
      //   if (data && 'code' in data) {
      //     if (data.name === 'Success') {
      //       console.log(data);
      //       $scope.user = data.data;
      //     }
      //   }
      // });
    });

    function listMerchandises(page) {
      api.send('merchandise/list', {
        page: page
      }, function (data) {
        if (data.name === 'Success') {
          $scope.merchandises = data.data.results;
          $scope.total = data.data.total;
          $scope.page = data.data.page;
        }
      });
    }

    function update(page) {
      barcode.list(page, function (data) {
        if (data) {
          $scope.barcodes = data.results;
          $scope.page = data.page;
          $scope.total = data.total;
        }
      });
    }

    update(page);

    $scope.openQuery = function () {
      $scope.queried = false;
    };

    $scope.query = function () {
      console.log('query');
      $scope.queried = false;
      var formData = new FormData($('form.query')[0]);
      api.send('barcode/query', formData, function (data) {
        console.log(data);
        $scope.queried = true;
        switch (data.name) {
          case 'NotFound':
            console.log('not found');
            $scope.merchandise = data.data.merchandise;
            break;
          case 'Success':
            console.log(data.data.merchandise);
            $scope.found = true;
            $scope.merchandise = data.data.merchandise;
            break;
        }
        update(page);
      });
    };

    $scope.remove = function (barcode) {
      if (!confirm('确定要删除吗?操作不可恢复!')) {
        return;
      }
      api.send('barcode/remove', {
        id: barcode.id
      }, function (data) {
        console.log(data);
        switch (data.code) {
          case 'Success':
            $('barcode-remove-' + barcode.id).remove();
            update(page);
            break;
        }
      });

    };

    function merchandiseInit() {
      var inPage = 1;
      var currentBarcode;
      $scope.openBind = function (barcode) {
        inPage = 1;
        currentBarcode = barcode;
        console.log(barcode);
        listMerchandises(inPage);

      };
      $scope.prev = function () {
        if (inPage > 1) {
          inPage--;
        }
        listMerchandises(inPage);
      };

      $scope.next = function () {
        inPage++;
        listMerchandises(inPage);
      };

      $scope.onSelectItem = function (sm) {
        $scope.merchandise = sm.merchandise;
        $scope.merchandise.sis = sm.sis;
        $scope.merchandise.images = sm.images;
        console.log(sm.merchandise);
      };


      $scope.bind = function () {
        console.log(currentBarcode);
        api.send('barcode/bind', {
          barcode: currentBarcode.barcode.id,
          merchandise: $scope.merchandise.id
        },
          function (data) {
            switch (data.code) {
              case 'Success':
                $('#bindMerchandise').hide();
                update(page);
                break;
            }
          });
      };
      $scope.unbind = function (barcode) {
        api.send('barcode/unbind', {
          barcode: barcode.barcode.id
        },
          function (data) {
            switch (data.code) {
              case 'Success':
                $('#bindMerchandise').hide();
                update(page);
                break;
            }
          });
      };
    }

    merchandiseInit();
  });

'use strict';

/**
 * @ngdoc service
 * @name merchantApp.modal
 * @description
 * # modal
 * Service in the merchantApp.
 */
angular.module('merchantApp')
  .service('modal', function ($timeout) {
    // AngularJS will instantiate a singleton by calling "new" on this function
    return {
      alert: function (message, ok) {
        $('#modal-alert').modal('show');
        $('.modal-body', $('#modal-alert')).html(message);
        $('.ok', $('#modal-alert')).unbind();
        $('.ok', $('#modal-alert')).click(function () {
          $('#modal-alert').modal('hide');
          $timeout(function () {
            if (ok) {
              ok();
            }
          }, 1000);
        });
      },
      confirm: function (message, ok, cancel) {
        $('#modal-confirm').modal('show');
        $('.modal-body', $('#modal-confirm')).html(message);
        $('.ok', $('#modal-confirm')).unbind();
        $('.cancel', $('#modal-confirm')).unbind();
        $('.ok', $('#modal-confirm')).click(function () {
          $('#modal-confirm').modal('hide');
          $timeout(function () {
            if (ok) {
              ok();
            }
          }, 1000);
        });
        $('.cancel', $('#modal-confirm')).click(function () {
          $('#modal-confirm').modal('hide');
          $timeout(function () {
            if (cancel) {
              cancel();
            }
          }, 1000);
        });
      },
      startProgress: function (message) {
        $('#modal-progress').modal('show');
        $('.note', $('#modal-progress')).html(message);
      },
      stopProgress: function () {
        $('#modal-progress').modal('hide');
      }
    };
  });

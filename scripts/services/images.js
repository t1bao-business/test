'use strict';

/**
 * @ngdoc service
 * @name merchantApp.images
 * @description
 * # images
 * Service in the merchantApp.
 */
angular.module('merchantApp')
  .service('images', function () {
    // AngularJS will instantiate a singleton by calling "new" on this function
    return {
      preview: function (files, cb) {
        if (!files) {
          return;
        }

        function bindImageNode(file) {
          var fr = new FileReader();
          fr.readAsDataURL(file);
          fr.onload = function (e) {
            cb(e.target.result);
          };
        }
        for (var i = 0; i < files.length; i++) {
          bindImageNode(files[i]);
        }
      }
    };
  });

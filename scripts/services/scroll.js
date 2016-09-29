'use strict';

/**
 * @ngdoc service
 * @name merchantApp.scroll
 * @description
 * # scroll
 * Service in the merchantApp.
 */
angular.module('merchantApp')
  .service('scroll', function () {
    // AngularJS will instantiate a singleton by calling "new" on this function
    return {
      bottom: function (selector, cb) {
        console.log('inside on scroll');
        console.log('selector:' + selector);

        angular.element(document).find(selector).unbind();
        angular.element(document).find(selector).on('scroll', function () {
          console.log('inside on scroll');
          var height = this.scrollHeight - this.scrollTop;
          var clientHeight = this.clientHeight;
          if (height === clientHeight) {
            if (cb) {
              cb(this.scrollTop);
            }
          }
        });
      }
    };
  });

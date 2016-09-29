'use strict';

/**
 * @ngdoc service
 * @name merchantApp.messages
 * @description
 * # messages
 * Service in the merchantApp.
 */
angular.module('merchantApp')
  .service('messages', function (api) {
    // AngularJS will instantiate a singleton by calling "new" on this function
    return {
      user: {
        login: function (formData, cb) {
          api.success('user/login', formData, cb);
        },
        logout: function (cb) {
          api.success('user/logout', {}, cb);
        },
        profile: function (cb, self) {
          if (!self) {
            api.success('user/profile', {}, cb);
          } else {
            api.selfSend('user/profile', {}, cb);
          }
        },
        register: function (data, cb) {
          api.send('user/register', data, cb);
        },
        update: function (data, cb) {
          api.success('user/update', data, cb);
        },
        feedback: function (data, cb) {
          api.success('user/feedback', data, cb);
        },
        subscribed: function (data, cb) {
          api.success('user/subscribed', data, cb);
        }
      },
      location: {
        update: function (pos, cb) {
          api.success('location/update', pos, cb);
        }
      },
      grocery: {
        list: function (data, cb) {
          api.success('store/list', data, cb);
        },
        nearby: function (data, cb) {
          api.success('store/nearby', data, cb);
        },
        search: function (data, cb) {
          api.success('store/search', data, cb);
        },
        info: function (data, cb) {
          api.success('store/info', data, cb);
        },
        subscribe: function (data, cb) {
          api.success('store/subscribe', data, cb);

        },
        unsubscribe: function (data, cb) {
          api.success('store/unsubscribe', data, cb);
        },
        issubscribed: function (data, cb) {
          api.selfSend('store/issubscribed', data, cb);
        }
      },
      merchandise: {
        list: function (data, cb) {
          api.success('merchandise/list', data, cb);
        },
        info: function (data, cb) {
          api.success('merchandise/info', data, cb);
        }
      },
      order: {
        create: function (data, cb) {
          api.success('order/create', data, cb);
        },
        list: function (data, cb) {
          api.success('order/list', data, cb);
        },
        info: function (data, cb) {
          api.success('order/info', data, cb);
        },
        update: function (data, cb) {
          api.success('order/update', data, cb);
        }
      },
      pay: {
        alipay: function (data, cb) {
          api.text('pay/alipay', data, cb);
        }
      },
      address: {
        add: function (data, cb) {
          api.success('address/add', data, cb);
        },
        list: function (data, cb) {
          api.success('address/list', data, cb);
        },
        update: function (data, cb) {
          api.success('address/update', data, cb);
        },
        remove: function (data, cb) {
          api.success('address/remove', data, cb);
        }
      },
      category: {
        list: function (data, cb) {
          api.success('category/list', data, cb);
        },
        merchandise: function (data, cb) {
          api.success('category/merchandise/list', data, cb);
        }
      },
      captcha: {
        check: function (data, cb) {
          api.selfSend('captcha/check', data, cb);
        },
        phone: function (data, cb) {
          api.selfSend('captcha/phone', data, cb);
        },
        email: function (data, cb) {
          api.selfSend('captcha/email', data, cb);
        },
        register: function (data, cb) {
          api.selfSend('captcha/register', data, cb);
        }
      },
      password: {
        retrieve: function (data, cb) {
          api.selfSend('password/retrieve', data, cb);
        }
      },
      oauth: {
        enc: function (cb) {
          api.selfSend('oauth/enc', {}, cb);
        }
      }
    };
  });

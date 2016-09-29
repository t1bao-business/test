'use strict';

/**
 * @ngdoc service
 * @name merchantApp.weixin
 * @description
 * # weixin
 * Service in the merchantApp.
 */
angular.module('merchantApp')
  .service('weixin', function (api) {
    // AngularJS will instantiate a singleton by calling 'new' on this function
    var apiList = [
      'checkJsApi',
      'scanQRCode',
      'onMenuShareTimeline',
      'onMenuShareAppMessage',
      'onMenuShareQQ',
      'onMenuShareWeibo',
      'onMenuShareQZone'
    ];
    return {
      configurated: false,
      fail: function (res) {
        alert('微信JSSDK配置失败！');
        alert(res.errMsg);
      },
      share: function (type, options, cb) {
        options.title = options.title || '田一块小卖部';
        options.link = options.link || 'http://m.t1bao.com';
        options.imgUrl = options.imgUrl || 'http://www.t1bao.com/images/logo.png';
        alert(JSON.stringify(options));
        options.success = function () {
          alert('分享成功！');
         };
        options.cancel = function () { };
        if (!wx) {
          alert('请在微信下面分享!');
        }
        var self = this;
        if (!this.configurated) {
          return this.init(function () {
            self.share(type, options, cb);
          });
        }
        switch (type) {
          default:
            wx.onMenuShareTimeline(options);
            break;
        }
        if (cb) {
          cb();
        }
      },
      scan: function (cb) {
        var self = this;
        if (!this.configurated) {
          return this.init(function () {
            self.scan(cb);
          });
        }
        wx.scanQRCode({
          needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
          scanType: ['qrCode', 'barCode'], // 可以指定扫二维码还是一维码，默认二者都有
          success: function (res) {
            var result = res.resultStr; // 当needResult 为 1 时，扫码返回的结果
            cb(result);
          }
        });
      },
      success: function () {
        this.configurated = true;
      },
      onRequest: function (cb) {
        var self = this;
        return function (json) {
          var config = {};
          for (var k in json.data) {
            config[k] = json.data[k];
          }

          config.jsApiList = apiList;
          config.timestamp = parseInt(config.timestamp);
          wx.config(config);
          wx.ready(function () {
            self.success();
            cb();
          });
          wx.error(function () {
            self.fail();
            cb();
          });
        };
      },
      init: function (cb) {
        var realPath = 'api/jssdk/config';
        api.selfSend(realPath, {
          url: location.origin + location.pathname
          //这个地址是发生jssdk调用的url地址
        },
          this.onRequest(cb), null, 'weixin/'
        );
      }
    };
  });

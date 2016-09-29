'use strict';

/**
 * @ngdoc function
 * @name merchantApp.controller:MerchadiseCtrl
 * @description
 * # MerchadiseCtrl
 * Controller of the merchantApp
 */
angular.module('merchantApp')
  .controller('MerchandiseCtrl', function ($scope, $route, $location, api, storage, merchandise,
  weixin) {
    var module = 'merchandise';

    $scope.type = 'merchandise';

    var page = parseInt($route.current.params.page) || 0;
    var category = parseInt($route.current.params.category);
    var online = $route.current.params.online;
    var ordering = $route.current.params.ordering;
    // var action = $route.current.params.action;
    var id = null;
    try {
      id = parseInt($route.current.params.id);
    } catch (e) {
      id = 0;
    }
    var q = $route.current.params.query;

    function getBaseUrl() {
      console.log(category);
      return 'merchandise/' + category + '/' + ordering + '/' + online + '';
    }

    $scope.page = page;
    $scope.total = 0;
    $scope.base = getBaseUrl();
    $scope.onlineString = '全部';
    $scope.order = ordering;
    $scope.q = q;

    if (q) {
      $scope.base = getBaseUrl() + '/q/' + encodeURIComponent(q);
    }
    console.log($route.current.$$route.originalPath);
    switch ($route.current.$$route.originalPath) {
      case '/merchandise/more':
        $scope.type = 'more';
        break;
      case '/merchandise/home':
      case '/merchandise/search':
        break;
      case '/merchandise/category/:id':
        category = parseInt($route.current.params.id);
        break;
      case '/merchandise/add':
        break;
      case '/merchandise/edit/:id':

        var merchandises = storage.get('merchandises');
        console.log(merchandises);

        if (!merchandises) {
          category = 0;
          $location.path(getBaseUrl() + '/list/1');
          return;
        }
        var found = false;
        for (var i = 0; i < merchandises.length; i++) {
          if (id === merchandises[i].id) {
            var ms = merchandises[i];
            var m = ms.merchandise;
            m.sis = ms.sis;
            m.images = ms.images;
            m.price = ms.price;
            $scope.merchandise = m;
            console.log($scope.merchandise);
            found = true;
            break;
          }
        }
        if (!found) {
          category = 0;
          $location.path(getBaseUrl() + '/list/1');
          return;
        }
        break;
      default:
        if (isNaN(category)) {
          category = 0;
          $location.path(getBaseUrl() + '/list/' + page);
          return;
        }
        break;
    }

    $scope.$on('$includeContentLoaded', function () {
      $scope.module = module;
      var options = getOptions(page);
      options.page = page + 1;
      merchandise.initScroll('.merchandise-list', function () { }, function (data) {
        if (!data) {
          return;
        }
        if (!data.results.length) {
          return;
        }
        $scope.merchandises = $scope.merchandises.concat(data.results);
        storage.set('merchandises', $scope.merchandises);
        $scope.total = data.total;
        $scope.page = data.page;
      }, options);
    });

    if (!page || page < 1) {
      page = 1;
    }

    function onlineToString(o) {
      switch (o) {
        case 'online':
          $scope.onlineString = '上线';
          break;
        case 'offline':
          $scope.onlineString = '下线';
          break;
        case 'all':
        /* falls through */
        default:
          $scope.onlineString = '全部';
          break;
      }
    }


    onlineToString(online);

    console.log(online);

    q = decodeURIComponent(q);

    var orders = [{
      name: '全部',
      value: 'all'
    }, {
        name: '价格',
        value: 'price'
      }, {
        name: '销量',
        value: 'sells'
      }, {
        name: '访问',
        value: 'visits'
      }];
    $scope.orders = orders;

    for (i = 0; i < orders.length; i++) {
      var item = orders[i];
      if (item.value === ordering) {
        $scope.orderName = item.name;
        break;
      }
    }

    api.send('category/list', {}, function (data) {
      if (data.name === 'Success') {
        $scope.categories = data.data.results;
        for (var i = 0; i < $scope.categories.length; i++) {
          if (category === $scope.categories[i].id) {
            $scope.categoryName = $scope.categories[i].name;
          }
        }
        console.log($scope.categories);
      }
    });

    function getOptions(page) {
      var options = {
        page: page,
        category: 0
      };
      if (!isNaN(category)) {
        options.category = category;
      }
      if (ordering) {
        options.order = ordering;
      }
      switch (online) {
        case 'online':
          options.online = true;
          break;
        case 'offline':
          options.online = false;
          break;
      }
      return options;
    }

    function update(page) {
      var options = getOptions(page);

      merchandise.list(options, function (data) {
        if (data) {
          $scope.merchandises = data.results;
          storage.set('merchandises', data.results);
          $scope.total = data.total;
          $scope.page = data.page;
        }
      });

      // api.send('merchandise/list', options, function(data) {
      //   if (data.name === 'Success') {
      //     $scope.merchandises = data.data.results;
      //     storage.set('merchandises', data.data.results);
      //     console.log(storage.get('merchandises'));
      //     console.log('saved');
      //     $scope.total = data.data.total;
      //     $scope.page = data.data.page;
      //   }
      // });
    }

    function updateQuery(q, page) {
      var options = getOptions(page);
      options.q = q;
      console.log(options);

      merchandise.query(options, function (data) {
        if (data) {
          $scope.merchandises = data.results;
          storage.set('merchandises', data.results);
          $scope.total = data.total;
          $scope.page = data.page;
        }
      });

      //
      // api.send('merchandise/query', options, function(data) {
      //   console.log(data);
      //   if (data.name === 'Success') {
      //     $scope.merchandises = data.data.results;
      //     $scope.total = data.data.total;
      //     $scope.page = data.data.page;
      //   }
      // });
    }

    function updateBoth(q, order) {
      if (q === 'undefined' || !q) {
        update(page, order);
      } else {
        $scope.q = q;
        updateQuery(q, page, order);

      }
    }

    updateBoth(q);

    $scope.openAdd = function () {
      $('.add')[0].reset();
    };

    $scope.add = function () {
      var formData = new FormData($('form.add')[0]);
      api.send('merchandise/add', formData, function (data) {
        switch (data.name) {
          case 'Success':
            $('#add').hide();
            alert('添加成功！');
            switch ($route.current.$$route.originalPath) {
              case '/merchandise/add':
                $location.path(getBaseUrl() + '/list/' + page);
                return;
            }
            update(page);
            break;
        }
      });
    };

    $scope.remove = function (storeMerchant) {
      if (!confirm('确定要删除吗?操作不可恢复!')) {
        return;
      }

      api.send('merchandise/remove', {
        id: storeMerchant.merchandise.id
      }, function (data) {
        switch (data.name) {
          case 'Success':
            $('#add').hide();
            alert('删除成功！');
            update(page);
            break;
        }
      });
    };

    // $scope.openModify = function (ms) {
    //   var m = ms.merchandise;
    //   m.sis = ms.sis;
    //   m.images = ms.images;
    //   m.price = ms.price;
    //   $scope.merchandise = m;
    //   $('#mod-category > option').each(function () {
    //     var val = parseInt($(this).val());
    //     var id = ms.category ? ms.category.id : 0;
    //     if (val === id) {
    //       $(this).attr('selected', true);
    //       this.selected = true;
    //     }
    //   });
    // };

    $scope.modify = function () {
      var formData = new FormData($('form.modify')[0]);
      console.log(formData);
      api.send('merchandise/update', formData, function (data) {
        console.log(data);
        if (data.name === 'Success') {
          alert('更新成功!');
          $location.path('merchandise/home');
          update(page);
        }
      });
    };

    $scope.removeImage = function (merchandiseId, imageId) {
      console.log(merchandiseId);
      console.log(imageId);
      if (!confirm('确定要删除吗?操作不可恢复!')) {
        return;
      }
      api.send('merchandise/image/remove', {
        mid: merchandiseId,
        id: imageId
      }, function (data) {
        console.log(data);
        if (data.name === 'Success') {
          $('.merchandise-edit-image-' + imageId).remove();
        }
      });
    };

    $scope.search = function () {
      console.log('search');
      console.log('q = ' + $scope.q);
      if ($scope.q) {
        merchandise.inputSearch($scope.q, page, function (data) {
          if (data) {
            $scope.queries = data.results;
            $scope.total = data.total;
            $scope.page = data.page;
          }
        });
      } else {
        $scope.queries = [];
        $scope.total = 0;
        $scope.page = 0;
      }
    };
    $scope.online = function (sm) {
      api.send('merchandise/online', {
        id: sm.merchandise.id,
        online: true
      }, function (data) {
        console.log(data);
        if (data.name === 'Success') {
          updateBoth(q, page);
        }
      });
    };
    $scope.offline = function (sm) {
      api.send('merchandise/online', {
        id: sm.merchandise.id,
        online: false
      }, function (data) {
        console.log(data);
        if (data.name === 'Success') {
          updateBoth(q, page);
        }
      });
    };

    $scope.selectCategory = function (cat) {
      console.log(cat);
      if (!cat || !cat.id) {
        $scope.category = null;
        category = 0;
      } else {
        $scope.category = cat;
        category = cat.id;
      }
      console.log(getBaseUrl() + '/list/' + page);
      $location.path(getBaseUrl() + '/list/' + page);
    };

    $scope.back = function () {
      $location.path(getBaseUrl() + '/list/' + page);
    };

    $scope.selectOrder = function (order) {
      $scope.order = order;
      //if (!order) {
      //  return updateBoth(q);
      //}
      switch (order.value) {
        case 'sells':
        case 'price':
        case 'visits':
          ordering = order.value;
          //updateBoth(q, order.value);
          break;
        default:
          ordering = 'none';
          break;
      }
      $location.path(getBaseUrl() + '/list/' + page);
    };

    $scope.selectOnline = function (o) {
      online = o;
      onlineToString(o);
      $location.path(getBaseUrl() + '/list/' + page);
    };

    $scope.pageStep = function (forward) {
      if (forward) {
        page++;
      } else {
        if (page > 1) {
          page--;
        }
      }
      $location.path(getBaseUrl() + '/list/' + page);
    };
    $scope.showItem = function (id) {
      console.log(id);
      $('#list-' + id).show();
      $('#list-' + id).removeClass('hidden');
      $('#hide-item-' + id).show();
      $('#hide-item-' + id).removeClass('hidden');
      $('#show-item-' + id).hide();
    };

    $scope.hideItem = function (id) {
      console.log(id);
      $('#list-' + id).hide();
      $('#hide-item-' + id).hide();
      $('#show-item-' + id).show();
    };
    $scope.scan = function() {
      weixin.scan();
    };
  });

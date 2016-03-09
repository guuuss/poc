'use strict';

/* App Module */

var pocapp = angular.module('pocApp', [
  'ngRoute',
  'ngAnimate',
  'productControllers'
]);

pocapp.config(['$routeProvider',
  function ($routeProvider) {
      $routeProvider.
        when('/products', {
            templateUrl: 'partials/product-list.html',
            controller: 'ProductListCtrl'
        }).
        when('/products/:productdetails/:productid', {
            templateUrl: 'partials/product-detail.html',
            controller: 'ProductDetailCtrl'
        }).
        when('/admin/:controlpanel', {
            templateUrl: 'partials/adminpanel.html',
            controller: 'AdminCtrl'
        }).
        when('/customer/:shoppingcart', {
            templateUrl: 'partials/shoppingcart.html',
            controller: 'shoppingcartCtrl'
        }).
        otherwise({
            templateUrl: 'partials/product-list.html',
            controller: 'ProductController'
        });
  }]);
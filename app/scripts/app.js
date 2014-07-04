'use strict';

angular.module('store', ['store.StoreService', 'store.UserService','ui.bootstrap']);

angular.module('store').config(['$routeProvider', function($routeProvider){
    $routeProvider.
        when('/', {
            templateUrl: 'models/store.html',
            controller: 'StoreController',
            requireLogin: false
        }).
        when('/login', {
            templateUrl: 'models/login.html',
            controller: 'LoginController'
        }).
        when('/cart', {
            templateUrl: 'models/cart.html',
            controller: 'CartController',
            resolve:{
                user: function(UserService){
                    return UserService.getCurrentUser();
                }
            },
            requireLogin: true
        }).
        when('/product/:sku', {
            templateUrl: 'models/product.html',
            controller: 'ProductController',
            requireLogin: false
        }).
        otherwise({
            redirectTo: '/'
        });
}]);

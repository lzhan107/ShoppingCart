angular.module('store.StoreService', ['ngResource']).
    factory('ProductService', ['$resource', function($resource){
        return $resource('product/:sku.json', {}, {
           get: {method: 'GET', params: {sku: 'products'}, isArray:true}
        });
    }])

angular.module('store').
    controller('MainCtrl', ['$scope', '$http', function($scope, $http){
        $scope.store = {};
        $scope.cart = {};
        /**
         * Loading all the products from JSON
         */
        $http.get('json/products.json')
            .then(function(resp){
                $scope.store.products = resp.data;
            });
        /**
         * Data for array in shopping cart
         * @type {Array}
         */
        $scope.store.userProducts = [];
        $scope.cart.total = 0.00;
        $scope.cart.totalQuantity = 0;
        $scope.cart.standardShippingPrice = 5.99;
    }]);

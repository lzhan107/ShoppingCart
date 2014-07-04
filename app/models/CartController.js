angular.module('store').
    controller('CartController', ['$scope','$modal','$dialog', function($scope, $modal, $dialog){
//        if (UserService.getCurrentUser() === undefined){
//            console.log("NOt authenticated")
//            $location.url("#/login");
//        }

        var bodyRef = angular.element(angular.$document);

        $scope.backToStoreClick = function(){

        }

        $scope.clearCartClick = function(){
            var products = angular.copy($scope.store.userProducts);
            angular.forEach(products, function(product){
                $scope.removeFromCartClick(product);
            });
        }

        $scope.removeFromCartClick = function(product){
//            console.log("Product to remove: " + product.name + " | " + product.checkedQuantity);
            var curQuantity = product.checkedQuantity;
            for (var i = 0; i < curQuantity; i++){
                $scope.changeQuantityClick(product.sku, product.price, 'decrease');
            }
//            var len = $scope.store.userProducts.length;
//            while(len--){
                $scope.store.userProducts.splice($scope.store.userProducts.indexOf(product),1);
//            }
        }

        $scope.changeQuantityClick = function(sku, price, action){
//            console.log("Change quantity click");
            if (action === 'increase'){
                $scope.cart.total = $scope.cart.total + price;
                $scope.cart.totalQuantity++;
            }else if (action === 'decrease'){
                $scope.cart.total = $scope.cart.total - price;
//                console.log("$scope.cart.total:  " + $scope.cart.total);
                $scope.cart.totalQuantity--;
            }

            angular.forEach($scope.store.products, function(product){
                if (sku === product.sku){
                    if (action === 'increase'){
                        product.checkedQuantity++;
                        product.quantity--;
                    }else if (action === 'decrease'){
                        product.checkedQuantity--;
                        product.quantity++;
                    }
                }
            });
        }

        $scope.orderSummaryClick = function(){
            $scope.isCollapsed = !$scope.isCollapsed;
        }

        $scope.isCollapsed = true;

        $scope.checkoutClick = function(){

            /*bodyRef.addClass('ovh');
            var modalInstance = $modal.open({
                templateUrl: 'models/dialog.html',
                scope: $scope
            });

            modalInstance.result.then(function(){
                bodyRef.removeClass('ovh');
            }, function(){
                bodyRef.removeClass('ovh');
            })*/
//            $dialog.dialog({}).open('models/dialog.html');

            $dialog.messageBox('Confirmation', 'You are about to checkout. Thank you for visiting us!', [{
                result: 'ok',
                label: 'OK'
            }, {
                result: 'cancel',
                label: 'Cancel'
            }], function(result) {
                if (result == 'ok') {
                }
                if (result == 'cancel') {
                    return false;
                }
            });
        }

        $scope.$watch('cart.total', function(){
            if ($scope.cart.total <= 0.00){
                $scope.orderSummaryPanelHide = true;
            }
        });
    }]);

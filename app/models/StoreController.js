angular.module('store').
    controller('StoreController', ['$scope', function($scope){



        $scope.addToCart = function(sku, quantity, price){
            $scope.cart.total = $scope.cart.total + price;
            $scope.cart.totalQuantity = $scope.cart.totalQuantity + 1;

            if ($scope.store.userProducts.length == 0){
                angular.forEach($scope.store.products, function(product){
                    if (product.sku === sku){
                        $scope.store.userProducts.push(product);
                        product.quantity = product.quantity - 1;
                        product.checkedQuantity = product.checkedQuantity + 1;
                    }
                });
            }else{
                angular.forEach($scope.store.products, function(product){
                   if(product.sku === sku){
                       var notFound = true;
                      angular.forEach($scope.store.userProducts, function(userProduct){
                        if (userProduct.sku === sku){
                            console.log("Sku found: " + sku);
                            notFound = false;
                        }
                      });
                       if(notFound){
                           console.log("User product pushed: " + product.name + " | " + product.sku);
                           $scope.store.userProducts.push(product);
                       }
                       product.checkedQuantity = product.checkedQuantity + 1;
                       product.quantity = product.quantity - 1;
                   }
                });
            }
            console.log("User products length: " + $scope.store.userProducts.length);
        }

//        $scope.filteredProducts = [];
//        $scope.currentPage = 1
//        $scope.numPerPage = 5
//        $scope.maxSize = 5;
//
//        $scope.numPages = function () {
//            return Math.ceil($scope.store.products.length / $scope.numPerPage);
//        };
//
//        $scope.$watch('currentPage + numPerPage', function(){
//            var begin = (($scope.currentPage - 1) * $scope.numPerPage)
//                , end = begin + $scope.numPerPage;
//                $scope.filteredProducts = $scope.store.products.slice(begin, end);
//        });

        $scope.currentPage = 1;
        $scope.numPerPage = 5;
        $scope.maxSize = 5;
        $scope.totalItems = 25;

        $scope.setPage = function (pageNo) {
            $scope.currentPage = pageNo;
        };

        $scope.numPages = function () {
            return Math.ceil($scope.store.products.length / $scope.numPerPage);
        };

        $scope.$watch('currentPage + numPerPage', function(){
            var begin = (($scope.currentPage - 1) * $scope.numPerPage)
                , end = begin + $scope.numPerPage;
            $scope.filteredProducts = $scope.store.products.slice(begin, end);
        });
    }]);


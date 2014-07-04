angular.module('store').
    controller('ProductController', ['$scope', '$routeParams', function($scope, $routeParams){
        $scope.product = {};


        $scope.rate = 7;
        $scope.max = 10;
        $scope.isReadonly = false;

        $scope.hoveringOver = function(value) {
            $scope.overStar = value;
            $scope.percent = 100 * (value / $scope.max);
        };

        $scope.ratingStates = [
            {stateOn: 'glyphicon-ok-sign', stateOff: 'glyphicon-ok-circle'},
            {stateOn: 'glyphicon-star', stateOff: 'glyphicon-star-empty'},
            {stateOn: 'glyphicon-heart', stateOff: 'glyphicon-ban-circle'},
            {stateOn: 'glyphicon-heart'},
            {stateOff: 'glyphicon-off'}
        ];

        $scope.getProduct = function(sku){
            angular.forEach($scope.store.products, function(product){
                if (sku == product.sku){
                    $scope.product = product;
                }
            });
        }

        $scope.getProduct($routeParams.sku);
    }]).

    filter('range', function(){
       return function(output, total, rating){
           console.log("output: " + output);
           console.log("total: " + total);//5
           console.log("rating: " + rating);//3
           total = parseInt(total);
           rating = parseInt(rating);

           for (var i= 0; i<rating; i++)
               output.push(1);
           for (var i = 0; i < total - rating; i++)
               output.push(0);
           return output;
       };
    });

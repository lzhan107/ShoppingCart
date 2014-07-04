'use strict';
angular.module("store.StoreService").factory('$dialog', ['$rootScope', '$modal', function ($rootScope, $modal) {
        function dialog(ops, resultFn) {
            var dialog = $modal.open(ops);
            if (resultFn)dialog.result.then(resultFn);
            dialog.values = ops;
            return dialog;
        }

        function ops(templateUrl, controller, scope) {
            return {templateUrl: templateUrl, controller: controller, scope: scope};
        }

        return {
            dialog: dialog,

            simpleDialog: function (templateUrl, controller, resultFn) {
                return function () {
                    return dialog(ops(templateUrl, controller, resultFn));
                };
            },

            messageBox: function (title, message, buttons, resultFn) {
                var scope = angular.extend($rootScope.$new(false), {title: title, message: message, buttons: buttons});
                return dialog(ops("models/dialog.html", "MessageController", scope), function (result) {
                    var value = resultFn ? resultFn(result) : undefined;
                    scope.$destroy();
                    return value;
                });
            }
        }
    }])
    .run(["$templateCache", function ($templateCache) {
        $templateCache.put("models/dialog.html",
            '<div class="modal-header"><h3>{{ title }}</h3></div>\n' +
                '<div class="modal-body"><p ng-bind-html="message"></p></div>\n' +
                '<div class="modal-footer"><button ng-repeat="btn in buttons" id="dialog_button_{{$index}}" ng-click="close(btn.result)" >{{ btn.label }}</button></div>\n');
    }]).controller('MessageController', ['$scope', '$modalInstance', function ($scope, $modalInstance) {
        $scope.close = function (result) {
            $modalInstance.close(result);
        };
    }]);

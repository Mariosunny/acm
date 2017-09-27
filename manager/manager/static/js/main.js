app.module = angular.module("app", []);

app.module.controller('main', function($scope) {

	$scope.selectedPage = 'members';
});

app.module.directive('selectOnClick', ['$window', function ($window) {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            element.on('click', function () {
                if (!$window.getSelection().toString()) {

                    this.setSelectionRange(0, this.value.length)
                }
            });
        }
    };
}]);
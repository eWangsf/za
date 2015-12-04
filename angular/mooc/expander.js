var app = angular.module('expanderModule', []);

app.directive('expander', function () {
    return {
        scope: {
            title: '=expanderTitle'
        },
        restrict: 'EA',
        replace: true,
        transclude: true,
        template: '<div>'
                + '<div class="title" ng-click="toggle()" >{{title}}</div>'
                + '<div class="body" ng-show="showMe" ng-transclude></div>'
                + '</div>',
        link: function (scope, element, attrs) {
            scope.showMe = false;
            scope.toggle = function () {
                scope.showMe = !scope.showMe;
            }
        }
    }
});

app.controller('expanderCtrl', function($scope) {
    $scope.title = '标题';
    $scope.text = '正文blabla';
});




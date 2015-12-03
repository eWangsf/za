var app = angular.module('app', []);
app.directive('hello', function () {
    return {
        restrict: 'E',
        template: '<h1>Hi here</h1>',
        replace: true
    };

});
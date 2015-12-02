var app = angular.module('firstApp', []);
app.controller('firstCtrl', function ($scope) {
    $scope.save = function () {
        alert('save');
    }
    $scope.clear = function () {
        $scope.message = "";
    }
});
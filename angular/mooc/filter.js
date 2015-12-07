var app = angular.module('filterModule', []);
app.controller('filterCtrl', function ($scope) {

});

app.filter('filterme', function () {
    return function (item) {
        return item + '!!!';
    } 
});


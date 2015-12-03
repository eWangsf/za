var app = angular.module('beiwang', []);
app.controller('beiwangCtrl', function ($scope) {
    $scope.items = [{
        txt: 'beiwang1',
        done: false
    }, {
        txt: 'beiwang2',
        done: false
    }, {
        txt: 'beiwang3',
        done: true
    }];
    $scope.addItem = function () {
        var txt = $scope.itemtxt;
        $scope.items.push({
            txt: txt,
            done: false
        });
        $scope.itemtxt = '';
    };
    $scope.clearDone = function () {
        var oldItems = $scope.items;
        var newItem = [];
        for(var i = 0; i < oldItems.length; i++) {
            if(!oldItems[i].done) {
                newItem.push(oldItems[i]);
            }
        }
        $scope.items = newItem;
    }
});
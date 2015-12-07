var app = angular.module('serviceModule', []);
app.factory('userListService', function ($http) {
    var doRequest = function (username, path) {
        return $http({
            method: 'GET',
            url: 'users.json'
        });
    }
    return {
        userList: function (username) {
            return doRequest(username, 'userList');
        }
    };
});

app.controller('serviceCtrl', function ($scope, $timeout, userListService) {
    var timeout;
    $scope.$watch('username', function (u) {
        if(u) {
            if(timeout) {
                $timeout.cancel(timeout);
            }
            timeout = $timeout(function () {
                userListService.userList(u).success(function (data) {
                    $scope.users = data;
                });
            }, 350);
        } else {
            $scope.users = [];
            if(timeout) {
                $timeout.cancel(timeout);
            }
        }
        
    });
});




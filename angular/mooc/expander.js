// var app = angular.module('expanderModule', []);

// app.directive('expander', function () {
//     return {
//         scope: {
//             title: '=expanderTitle'
//         },
//         restrict: 'EA',
//         replace: true,
//         transclude: true,
//         template: '<div>'
//                 + '<div class="title" ng-click="toggle()" >{{title}}</div>'
//                 + '<div class="body" ng-show="showMe" ng-transclude></div>'
//                 + '</div>',
//         link: function (scope, element, attrs) {
//             scope.showMe = false;
//             scope.toggle = function () {
//                 scope.showMe = !scope.showMe;
//             }
//         }
//     }
// });

// app.controller('expanderCtrl', function($scope) {
//     $scope.title = '标题';
//     $scope.text = '正文blabla';
// });


var app = angular.module('expanderModule', []);

app.directive('accordion', function () {
    return {
        restrict: 'EA',
        replace: true,
        transclude: true,
        template: '<div ng-transclude></div>',
        controller: function () {
            var expanders = [];
            this.gotOpened = function (selectedObj) {
                angular.forEach(expanders, function (expander) {
                    if(expander != selectedObj) {
                        expander.showMe = false;
                    }
                });
            };
            this.addExpander = function (expander) {
                expanders.push(expander);
            }
        }
    }
});

app.directive('expander', function () {
    return {
        restrict: 'EA',
        replace: true,
        transclude: true,
        require : '^?accordion',
        scope: {
            title: '=expanderTitle'
        },
        template: '<div>'
                + '<div class="title" ng-click="toggle()" >{{title}}</div>'
                + '<div class="body" ng-show="showMe" ng-transclude></div>'
                + '</div>',
        link: function (scope, element, attrs, expanderCtrl) {
            scope.showMe = false;
            expanderCtrl.addExpander(scope);
            scope.toggle = function toggle() {
                scope.showMe = !scope.showMe;
                expanderCtrl.gotOpened(scope);
            }
        }
    }
});


app.controller('expanderCtrl', function($scope) {
    $scope.expanders = [{
        title: 'title1',
        text: 'text1'
    }, {
        title: 'title2',
        text: 'text2'
    },{
        title: 'title3',
        text: 'text3'
    }
    ];
});








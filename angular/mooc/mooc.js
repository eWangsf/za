// function helloAngular($scope) {
//     $scope.greeting = {
//         text: 'hh'
//     };
// }



// var app = angular.module('eventTest', []);

// app.controller('SelfCtrl', function($scope) {
//     $scope.click = function () {
//         $scope.$broadcast('to-child', 'child');
//         $scope.$emit('to-parent', 'parent');
//     }
// });

// app.controller('ParentCtrl', function($scope) {
//     $scope.$on('to-parent', function(event, data) {
//         console.log('ParentCtrl', data, 'hahaha');       //父级能得到值
//     });
//     $scope.$on('to-child', function(event, data) {
//         console.log('ParentCtrl', data);       //子级得不到值
//     });
// });

// app.controller('ChildCtrl', function($scope){
//     $scope.$on('to-child', function(event, data) {
//         console.log('ChildCtrl', data);         //子级能得到值
//     });
//     $scope.$on('to-parent', function(event, data) {
//         console.log('ChildCtrl', data);         //父级得不到值
//     });
// });

// app.controller('BroCtrl', function($scope){  
//     $scope.$on('to-parent', function(event,data) {  
//         console.log('BroCtrl', data);          //平级得不到值  
//     });  
//     $scope.$on('to-child', function(event,data) {  
//         console.log('BroCtrl', data);          //平级得不到值  
//     });  
// });


// var app = angular.module('broAndEmit', []);
// app.controller('AbcController', function($scope) {
//     $scope.count = 0;
//     $scope.fireEvent = function () {
//         $scope.$emit('MyEvent');
//         $scope.$broadcast('MyEvent');
//     }
// });

// app.controller('EventController', function ($scope) {
//     $scope.count = 0;
//     $scope.$on('MyEvent', function (event, data) {
//         $scope.count ++;
//     })
// });
// app.controller('');










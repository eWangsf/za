var templateApp = angular.module('templateModule', []);
templateApp.controller('templateCtrl', function ($scope) {
    $scope.flag = "flagvalue";
});

// angular.module('templateModule', [])
// .controller('templateCtrl', ['$scope','$templateCache', function ($scope, $templateCache){
//         var tmp = '<h4>lovestory</h4>'
//             + '<p>这是直接调用$templateCache服务获取模板文件的方式</p>'
//             + '<a href="http://www.baidu.com">服务启用templateCache方式</a>';
//         $templateCache.put('tp.html',tmp);                
// }]);



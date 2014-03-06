//prove angular app is working
angular.module('app').controller('mvMainCtrl',function($scope, mvCachedCourses){
    $scope.courses =  mvCachedCourses.query();
});


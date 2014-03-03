angular.module('app').controller('mvUserListCtrl', function($scope, mvUser){
    //query the resource
    $scope.users = mvUser.query();
});
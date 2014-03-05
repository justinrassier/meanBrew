angular.module('app').controller('mvSignupCtrl',function($scope, mvAuth, mvNotifier, $location){
    $scope.signup = function(){
        var newUserData = {
            username: $scope.email,
            password: $scope.password,
            firstName: $scope.firstName,
            lastName: $scope.lastName
        };
        mvAuth.createUser(newUserData).then(function(){
            mvNotifier.notify('User Account Created!');
            $location.path('/');

        }, function(reason){
            mvNotifier.error(reason);
        });
    }

})
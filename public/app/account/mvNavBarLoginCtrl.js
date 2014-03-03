angular.module('app').controller('mvNavBarLoginCtrl', function($scope, $http, mvIdentity, mvNotifier, mvAuth,$location ){
    $scope.identity = mvIdentity;
    $scope.signin = function(username,password){
        mvAuth.authenticateUser(username, password).then(function(success){
           if(success){
               mvNotifier.notify("You have been logged in!");
           }
            else{
               mvNotifier.notify("Invalid username/password");
           }
        });
    };
    $scope.logout = function(){
        mvAuth.logoutUser().then(function(){
            //clear out username and password fields
            $scope.username = "";
            $scope.password = "";
            mvNotifier.notify("You have been successfully logged out");
            $location.path('/');
        });
    };
});

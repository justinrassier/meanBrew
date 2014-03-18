//prove angular app is working
angular.module('app').controller('mvMainCtrl',function($scope, mvAuth){
    mvAuth.authenticateUser('justinrassier@outlook.com','justin');
});


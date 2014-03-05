//auth service to pull logic out of controller
angular.module('app').factory('mvAuth', function($http, mvIdentity, $q, mvUser){
   return {
       authenticateUser : function(username, password){
           var dfd = $q.defer();
           $http.post('/login', {username: username, password:password}).then(function(response){
               if(response.data.success){
                   //user response to create user resource
                   var user = new mvUser();
                   angular.extend(user, response.data.user);
                   mvIdentity.currentUser = user;
                   dfd.resolve(true);
               }
               else{
                   dfd.resolve(false);
               }
           });
           return dfd.promise;
       },
       createUser: function(newUserData){
           var newUser = new mvUser(newUserData);
           var dfd = $q.defer();

           newUser.$save().then(function(){
               mvIdentity.currentUser = newUser;
               dfd.resolve();
           },function(response){
               dfd.reject(response.data.reason);
           });

           return dfd.promise;
       },
       updateCurrentUser: function(newUserData){
           var dfd = $q.defer();

            //clone current user because we dont' want to update it unless the save was successful
           var clone = angular.copy(mvIdentity.currentUser);
           angular.extend(clone, newUserData);

           //new update method that we defined on the the mvUser resource for PUT
           clone.$update().then(function(){
              mvIdentity.currentUser = clone;
              dfd.resolve();
           }, function(response){
               dfd.reject(response.data.reason);
           });
           return dfd.promise;
       },
       logoutUser: function(){
           var dfd = $q.defer();

            $http.post('/logout', {logout:true}).then(function(){
                mvIdentity.currentUser = undefined;
                dfd.resolve();
            });

           return dfd.promise;
       },
       authorizeCurrentUserForRoute: function(role){
               if(mvIdentity.isAuthorized('admin')){
                   return true;
               }
               else{
                   return $q.reject('not authorized');
               }
           },
       authorizeAuthenticatedUserForRoute: function(){
           if(mvIdentity.isAuthenticated()){
            return true;
           }
           else{
               return $q.reject('not authorized');
           }
       }

    }

});
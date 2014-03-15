angular.module('app').controller('mvRecipeDetailCtrl', function(mvRecipe, $routeParams){
    //go to the server to get the recipe, this will be ready then when we stop sending the whole user graph up
    mvRecipe.query({_id: $routeParams._id}).$promise.then(function(){
        console.log(mvRecipe)
    },function(){

    })
});

/*angular.module('app').controller('mvCourseDetailCtrl', function($scope, mvCachedCourses, $routeParams){
 //use the cached courses resource we created to get the course list if it already has been retrieved
 //the query request returns a promise because it is async, if not actually querying then the promise
 //wrapper must still take care of the results
 mvCachedCourses.query().$promise.then(function(collection){
 collection.forEach(function(course){
 if(course._id === $routeParams.id){
 $scope.course = course;
 }
 })
 })

 })
    */
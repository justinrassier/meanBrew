angular.module('app').controller('mvRecipeDetailCtrl', function($scope,mvRecipe, $routeParams,$location, mvNotifier){
    //go to the server to get the recipe, this will be ready then when we stop sending the whole user graph up
    mvRecipe.query({_id: $routeParams._id}).$promise.then(function(recipeCollection){
        $scope.recipe = recipeCollection[0];
    },function(reason){
        mvNotifier.error(reason.data);
    });
    $scope.updateRecipe = function(){
        //the recipe comes back from the query above as a resource, so we can just call our update
        $scope.recipe.$update().then(function(recipe){

            mvNotifier.notify('Recipe Updated');
            $location.path('/recipe');
        }, function(reason){
            mvNotifier.error(reason.data);
        })
    };

});

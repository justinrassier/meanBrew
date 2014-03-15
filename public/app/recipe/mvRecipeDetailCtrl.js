angular.module('app').controller('mvRecipeDetailCtrl', function($scope,mvRecipe, $routeParams, mvNotifier){
    //go to the server to get the recipe, this will be ready then when we stop sending the whole user graph up
    mvRecipe.query({_id: $routeParams._id}).$promise.then(function(recipeCollection){
        $scope.recipe = recipeCollection[0];
    },function(reason){
        mvNotifier.error(reason.data);
    });
    $scope.updateRecipe = function(){
        console.log('here');
        //the recipe comes back from the promise as a resource, so we can just call our update
        $scope.recipe.$update().then(function(){
            mvNotifier.notify('Recipe Updated');
        }, function(){})
    };

});

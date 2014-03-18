angular.module('app').controller('mvRecipeCtrl', function($scope, mvIdentity, mvRecipe){
    //right now the whole user object graph is getting sent up, so just attach the recipes to the scope
    //$scope.myRecipes = mvIdentity.currentUser.recipes;

    mvRecipe.query().$promise.then(function(recipes){
        console.log(recipes);
        $scope.myRecipes = recipes;
    }, function(){});
});

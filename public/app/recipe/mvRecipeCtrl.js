angular.module('app').controller('mvRecipeCtrl', function($scope,$location, mvIdentity){
    //right now the whole user object graph is getting sent up, so just attach the recipes to the scope
    $scope.myRecipes = mvIdentity.currentUser.recipes;
    $scope.goToCreate = function(){
        $location.path('/recipe/create');
    };
});

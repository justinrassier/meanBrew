angular.module('app').controller('mvCreateRecipeCtrl',function($scope,$location, mvRecipe, mvIdentity, mvNotifier){
    $scope.createRecipe = function(){
        var newRecipeData =
        {
            name : $scope.name,
            style: $scope.style,
            description: $scope.description
        };
        var newRecipe = new mvRecipe(newRecipeData);
        newRecipe.$save().then(function(){
            mvNotifier.notify('Recipe created successfully!');
            mvIdentity.currentUser.recipes.push(newRecipe);
            $location.path('/recipe');
        }, function(response){
            console.log(response);
        });
    };
});
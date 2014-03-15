angular.module('app').controller('mvCreateRecipeCtrl',function($scope, mvRecipe, mvIdentity, mvNotifier){
    $scope.createRecipe = function(){
        var newRecipeData =
        {
            name : $scope.name,
            style: $scope.style,
            description: $scope.description
        }
        var newRecipe = new mvRecipe(newRecipeData);
        newRecipe.$save().then(function(){
            mvNotifier.notify('Recipe created successfully!');
            mvIdentity.currentUser.recipes.push(newRecipe);
        }, function(response){
            console.log(response);
        })
    };
});
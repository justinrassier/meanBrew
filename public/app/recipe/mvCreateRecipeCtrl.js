angular.module('app').controller('mvCreateRecipeCtrl',function($scope, mvRecipe, mvNotifier){
    $scope.createRecipe = function(){
        var newRecipeData =
        {
            name : $scope.name,
            style: $scope.style,
            description: $scope.description
        }
        var newRecipe = new mvRecipe(newRecipeData);
        newRecipe.$save().then(function(){
            mvNotifier('Recipe created successfully!');
        }, function(response){
            console.log(response);
        })
    };
});
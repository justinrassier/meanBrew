angular.module('app').controller('mvCreateRecipeCtrl',function($scope,$location, mvRecipe, mvIdentity, mvNotifier, mvStyle, styleHelpers){
    $scope.selectedStyle;


    mvStyle.query().$promise.then(function(styles){

        $scope.styles = styleHelpers.flattenStylesForSelectList(styles);
        console.log($scope.styles);
    });
    $scope.createRecipe = function(){

        var newRecipeData =
        {
            name : $scope.name,
            style: $scope.selectedStyle.subCategoryName,
            description: $scope.description
        };
        var newRecipe = new mvRecipe(newRecipeData);
        newRecipe.$save().then(function(){
            mvNotifier.notify('Recipe created successfully!');
            $location.path('/recipe');
        }, function(response){
            mvNotifier.error(response.data);
        });
    };
});
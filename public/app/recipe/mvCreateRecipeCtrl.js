angular.module('app').controller('mvCreateRecipeCtrl',function($scope,$location, mvRecipe, mvIdentity, mvNotifier, mvStyle){
    $scope.selectedStyle;


    mvStyle.query().$promise.then(function(styles){
        console.log(styles);
        $scope.styles =  _.flatten(_.map(styles,function(style){
            return _.map(style.subStyles,function(sub){
                return {categoryName: style.categoryName, subCategoryName: sub.categoryName};
            })
        }),true);

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
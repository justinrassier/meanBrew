angular.module('app').factory('mvRecipe',function($resource){
    var RecipeResource = $resource('/api/recipe/:_id', {_id: '@id'});

    return RecipeResource;

});

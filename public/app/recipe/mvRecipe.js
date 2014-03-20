angular.module('app').factory('mvRecipe',function($resource){
    var RecipeResource = $resource('/api/recipe/:_id', {_id: '@id'},
        {update: {method: 'PUT', isArray:false }},
        {delete: {method: 'DELETE'}});

    return RecipeResource;

});

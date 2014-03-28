//probably can be a better place for this type of stuff, but at least it is centralized for now
angular.module('app').factory('styleHelpers', function(){

    var flattenStylesForSelectList = function(styles){
        return  _.flatten(_.map(styles,function(style){
            return _.map(style.subStyles,function(sub){
                return {categoryName: style.categoryName,
                    subCategoryName: sub.categoryName,
                    subCategoryNumber: sub.categoryNumber,
                    subCategoryId: sub._id};
            });
        }),true);
    };

    return{
        flattenStylesForSelectList: flattenStylesForSelectList
    };
});
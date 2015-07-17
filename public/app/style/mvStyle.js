angular.module('app').factory('mvStyle', function($resource){
    var StyleResource = $resource('/api/style/:_id', {_id: '@id'});

    return StyleResource;
});
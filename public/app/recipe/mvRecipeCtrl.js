angular.module('app').controller('mvRecipeCtrl', function($scope){
    $scope.recipes = [
        {name:'Bitter Bitter Bitter', style: "IPA"},
        {name:'The Darkness', style: "Russian Imperial Stout"},
        {name:'Plain ole Porter', style: "Baltic Porter"},
        {name:"Matt's Crazy Brew", style: "American Pale Ale"},
        {name: 'Hope and King Clone', style: "Scottish Ale"}
    ];
});

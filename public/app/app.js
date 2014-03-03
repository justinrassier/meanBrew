var app = angular.module('app',['ngResource', 'ngRoute']);

app.config(function($routeProvider, $locationProvider){
    $locationProvider.html5Mode(true);
    $routeProvider
        .when('/', {templateUrl: '/partials/main/main', controller: 'mvMainCtrl'})
        .when('/recipe', {templateUrl: '/partials/recipe/browseRecipes', controller: 'browseRecipe'})
        .when('/admin/users', {templateUrl: '/partials/admin/user-list', controller: 'mvUserListCtrl'})

});

app.controller('browseRecipe', function($scope){
    $scope.recipes = [
        {name:'IPA'},
        {name:'Stout'},
        {name:'Porter'},
        {name:'Etc'}
    ];
});

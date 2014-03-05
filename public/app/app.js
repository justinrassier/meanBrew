var app = angular.module('app',['ngResource', 'ngRoute']);

app.config(function($routeProvider, $locationProvider){
    //pull out route resolver for admin access into own object
    var routeRoleChecks = {
       admin:{ auth: function(mvAuth){
            return mvAuth.authorizeCurrentUserForRoute('admin');
       }}
    };


    $locationProvider.html5Mode(true);
    $routeProvider
        .when('/', {templateUrl: '/partials/main/main', controller: 'mvMainCtrl'})
        .when('/recipe', {templateUrl: '/partials/recipe/browseRecipes', controller: 'browseRecipe'})
        .when('/admin/users', {templateUrl: '/partials/admin/user-list',
            controller: 'mvUserListCtrl', resolve: routeRoleChecks.admin
        })
        .when('/admin/users', {templateUrl: '/partials/account/signup',
            controller: 'mvSignupCtrl'
        })

});

//call run so that this runs after the code above is configured
//$rootScope is listening for route change error events
//$location is to redirect
angular.module('app').run(function($rootScope, $location){
    $rootScope.$on('$routeChangeError', function(evt, current, previous, rejection){
        if(rejection ==='not authorized'){
            $location.path('/');
        }
    });
});

app.controller('browseRecipe', function($scope){
    $scope.recipes = [
        {name:'IPA'},
        {name:'Stout'},
        {name:'Porter'},
        {name:'Etc'}
    ];
});

describe('mvRecipeCtrl', function(){
    beforeEach(module('app'));

    describe('The Controller',function(){
        var scope,
            ctrl;

        it('Should Contain 4 Routes', inject(function($rootScope,$controller){
                 scope = $rootScope.$new();
                 ctrl = $controller('browseRecipe', {$scope: scope});

                expect(scope.recipes.length).toBe(4);
        }));

        it('Should contains a route of "IPA" as the first route', inject(function($rootScope, $controller){
                scope = $rootScope.$new();
                ctrl = $controller('browseRecipe', {$scope: scope});

            expect(scope.recipes[0].name).toBe('IPA');
        }));

    });
})
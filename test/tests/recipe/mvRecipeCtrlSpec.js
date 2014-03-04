describe('mvRecipeCtrl', function(){
    beforeEach(module('app'));

    describe('The Controller',function(){
        it('Should Contain Routes', inject(function($rootScope,$controller){
            var scope = $rootScope.$new(),
                ctrl = $controller('browseRecipe', {$scope: scope});

                expect(scope.recipes.length).toBe(4);

        }));

    });
})
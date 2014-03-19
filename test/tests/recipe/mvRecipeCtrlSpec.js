describe('mvRecipeCtrl', function(){
    beforeEach(module('app'));

    //TODO: Place the mocked recipe collection global somewhere for other tests to use?
    describe('The Controller',function(){
        var scope,
            ctrl;
        beforeEach(inject(function($rootScope, $controller, $httpBackend){
            //the mvRecipeCtrl uses the mvIdentity which gets its current user from the $window object
            scope = $rootScope.$new();
            ctrl = $controller('mvRecipeCtrl', {$scope: scope});
            $httpBackend.expectGET('/api/recipe').respond(seeder.recipes);
            $httpBackend.flush();
        }));

        it('Should exist', inject(function($httpBackend){
            expect(ctrl).not.toBeNull();
        }));

        it('Should Contain 1 Recipe', function(){
            expect(scope.myRecipes.length).toBeGreaterThan(0);
        });

    });
})
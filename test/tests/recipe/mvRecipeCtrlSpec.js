describe('mvRecipeCtrl', function(){
    beforeEach(module('app'));

    //TODO: Place the mocked recipe collection global somewhere for other tests to use?
    describe('The Controller',function(){
        var scope,
            ctrl,
            recipes = [{name: "Justin's Stout", style: "American Stout", description: "A dark and awesome beer"}];
        beforeEach(inject(function($window, $rootScope, $controller){
            //the mvRecipeCtrl uses the mvIdentity which gets its current user from the $window object
            $window.bootstrappedUserObject = {firstName: "Justin", lastName: "Rassier", recipes: recipes};
            scope = $rootScope.$new();
            ctrl = $controller('mvRecipeCtrl', {$scope: scope});
        }));
        it('Should exist', function(){
            expect(ctrl).not.toBeNull();
        });

        it('Should Contain 1 Recipe', function(){
            expect(scope.myRecipes.length).toBe(1);
        });

    });
})
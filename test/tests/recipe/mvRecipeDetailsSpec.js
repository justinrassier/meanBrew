describe('mvRecipeDetailsCtrl', function(){
    beforeEach(module('app'));

    describe('The Controller',function(){
        var scope,
            ctrl;
        it('Should exist', inject(function($rootScope, $controller){

            scope = $rootScope.$new();
            ctrl = $controller('mvRecipeDetailCtrl', {$scope: scope});

            expect(ctrl).not.toBeNull($controller);
            expect(ctrl).toBeDefined();
        }));
    });
})
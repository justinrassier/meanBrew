describe('mvCreateRecipeCtrl', function(){
    beforeEach(module('app'));

    describe('The Controller',function(){
        var scope,
            ctrl;
        it('Should exist', inject(function($rootScope, $controller){

             scope = $rootScope.$new();
             ctrl = $controller('mvCreateRecipeCtrl', {$scope: scope});

             expect(ctrl).not.toBeNull($controller);
             expect(ctrl).toBeDefined();
        }));
    });
})
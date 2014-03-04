var app = angular.module('app');

describe('Our app', function(){
    it('should load', function(){
        expect(app.name).toBe('app');
    });

    describe('The recipe controller', function(){
        var ctrl;

        beforeEach(inject(function($controller){
            ctrl = $controller('RecipeCtrl');
        }));

        it('exists', function(){
            expect(ctrl).toBeDefined();
        });
    });
});
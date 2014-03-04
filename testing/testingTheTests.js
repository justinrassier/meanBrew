
describe('Our app', function(){
//    var app;

    beforeEach(function(){
        console.log('beforeBlah');
        module('app')
    });

//    it('should load', function(){
//        expect(app.name).toBe('app');
//    });

    describe('The recipe controller', function(){
        var ctrl,
            scope;

        beforeEach(inject(function(){
            console.log('blah');
//            scope = $rootScope.$new();
//            ctrl = $controller('RecipeCtrl', {$scope:scope});
        }));

        it('exists', function(){
            expect(ctrl).toBeDefined();
        });
    });
});


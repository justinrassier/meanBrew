describe('mvRecipeDetailsCtrl', function(){
    beforeEach(module('app'));

    describe('The Controller',function(){
        var scope,
            ctrl;

        beforeEach(inject(function($httpBackend, $rootScope, $controller, $routeParams){
            //mock route params for resource query
            $routeParams._id = 1234;

            scope = $rootScope.$new();
            ctrl = $controller('mvRecipeDetailCtrl', {$scope: scope});
            $httpBackend.expectGET('/api/recipe/1234').respond([seeder.recipes[0]]);
            $httpBackend.flush();
        }));

        describe("on initialize", function(){

            it('Should exist', inject(function(){
                expect(ctrl).not.toBeNull();
                expect(ctrl).toBeDefined();
            }));

            it('should have a recipe attached to the scope', function(){
                expect(scope.recipe).toBeDefined();
                expect(scope.recipe.name).toEqual(seeder.recipes[0].name);
            });
        });

        describe('on update recipe success', function(){
            var notifier;
            beforeEach(inject(function($httpBackend, mvNotifier, mvToastr){
                notifier = mvNotifier;
                spyOn(notifier, 'notify');

                $httpBackend.expectPUT('/api/recipe/1234').respond({name: "new recipe"});
                scope.updateRecipe();
                $httpBackend.flush();
            }));

            it('should attach the new object to the scope', function(){
                expect(scope.recipe.name).toEqual('new recipe');
            });

            it('should call mvNotifier with a message of "Recipe Updated"', function(){
               expect(notifier.notify).toHaveBeenCalledWith('Recipe Updated');
            });
        });

        describe('on update recipe failure', function(){
            var notifier;
            beforeEach(inject(function($httpBackend, mvNotifier, mvToastr){
                notifier = mvNotifier;
                spyOn(notifier, 'error');

                $httpBackend.expectPUT('/api/recipe/1234').respond(400);
                scope.updateRecipe();
                $httpBackend.flush();
            }));

            it('should call the notifier with an error', function(){
                expect(notifier.error).toHaveBeenCalled();
            });
        });

    });
})
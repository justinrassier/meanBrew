describe('mvRecipeDetailsCtrl', function(){
    beforeEach(module('app'));

    describe('The Controller',function(){
        var scope,
            ctrl,
            notifier;

        beforeEach(inject(function($httpBackend, $rootScope, $controller, $routeParams, mvNotifier, mvRecipe){
            //mock route params for resource query
            $routeParams._id = 1234;
            
            notifier = mvNotifier;
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

            it('should have an update recipe method attached to the scope', function(){
                expect(scope.updateRecipe).toBeDefined();
            });

            it('should have a delete recipe method attached to the scope', function(){
                expect(scope.deleteRecipe).toBeDefined();
            });
        });

        describe('on update recipe success', function(){
            beforeEach(inject(function($httpBackend){
                spyOn(notifier, 'notify');

                $httpBackend.expectPUT('/api/recipe').respond({name: "new recipe"});
                scope.updateRecipe();
                $httpBackend.flush();
            }));

            it('should attach the new object to the scope', function(){
                expect(scope.recipe.name).toEqual('new recipe');
            });

            it('should call mvNotifier with a message of "Recipe Updated"', function(){
               expect(notifier.notify).toHaveBeenCalledWith('Recipe Updated');
            });

            it('should redirect to the recipes main URL', inject(function($location){
                expect($location.path()).toEqual('/recipe');
            }));
        });

        describe('on update recipe failure', function(){
            beforeEach(inject(function($httpBackend){
                spyOn(notifier, 'error');

                $httpBackend.expectPUT('/api/recipe').respond(400);
                scope.updateRecipe();
                $httpBackend.flush();
            }));

            it('should call the notifier with an error', function(){
                expect(notifier.error).toHaveBeenCalled();
            });
        });

        describe('on delete success', function(){
            beforeEach(inject(function($httpBackend){
                spyOn(notifier, 'notify');

                $httpBackend.expectDELETE('/api/recipe/1234').respond(200);
                scope.deleteRecipe();
                $httpBackend.flush();
            }));

            it('should redirect to the recipes main URL', inject(function($location){
                expect($location.path()).toEqual('/recipe');
            }));

            it('should call mvNotifier with a message of "Recipe Deleted', function(){
                expect(notifier.notify).toHaveBeenCalledWith('Recipe Deleted');
            });
        });
        
        describe('on delete failure', function(){
            beforeEach(inject(function($httpBackend){
                
                spyOn(notifier, 'error');
                $httpBackend.expectDELETE('/api/recipe/1234').respond(400);
                scope.deleteRecipe();
                $httpBackend.flush();
            }));
            
            it('should call the notifier with an error', function(){
               expect(notifier.error).toHaveBeenCalled(); 
            });
            
        });
    });
})
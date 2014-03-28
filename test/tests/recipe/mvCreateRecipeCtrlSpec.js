describe('mvCreateRecipeCtrl', function(){
    beforeEach(module('app'));

    describe('The Controller',function(){
        var scope,
            ctrl,
            notifier;
            
        beforeEach(inject(function($httpBackend, $rootScope, $controller, mvNotifier, mvIdentity){
             notifier = mvNotifier;
             scope = $rootScope.$new();
             ctrl = $controller('mvCreateRecipeCtrl', {$scope: scope});

            //every init will get the styles
            $httpBackend.expectGET('/api/style').respond(seeder.styles);
            $httpBackend.flush();

            scope.selectedStyle = scope.styles[0];
        }));
            
        describe('on initialize', function(){

            it('Should exist', function($rootScope, $controller){
                 expect(ctrl).not.toBeNull($controller);
                 expect(ctrl).toBeDefined();
            });
            
            it('the scope should contain a function called createRecipe()', function(){
                expect(scope.createRecipe).toBeDefined();
            });

            it('should retrieve styles from the Style resource and attach it to the scope', function(){
                console.log(scope.styles);
                expect(scope.styles).toBeDefined();
                expect(scope.styles[0].categoryName).toEqual('Light Lager');
            });
        
        });
        
        describe('on successful recipe create', function(){
            
            beforeEach(inject(function($httpBackend){
                spyOn(notifier, 'notify');
  
                $httpBackend.expectPOST('/api/recipe').respond(seeder.recipes[0]);
                scope.createRecipe();
                $httpBackend.flush();
            }));
            
            it('should call notify on the notifier', function(){
                expect(notifier.notify).toHaveBeenCalledWith('Recipe created successfully!');
            });
            it('should redirect back to the main recipes url', inject(function($location){
               expect($location.path()).toEqual('/recipe'); 
            }));
        });
        
        describe('on failed recipe created', function(){
            beforeEach(inject(function($httpBackend){
                spyOn(notifier, 'error');
                $httpBackend.expectPOST('/api/recipe').respond(400);
                scope.createRecipe();
                $httpBackend.flush();
            }));
            it('should call error on the notifier', function(){
               expect(notifier.error).toHaveBeenCalled(); 
            });
            
            it('should not redirect the user anywhere', inject(function($location){
                expect($location.path()).toEqual('/');
            }));
        });
        

    });
})
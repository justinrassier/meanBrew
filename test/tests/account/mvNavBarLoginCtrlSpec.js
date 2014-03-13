//So many dependencies, we should talk how you should even try to unit test this 
/*
describe('mvNavBarLoginCtrl', function(){
    beforeEach(function(){
        module('app');
    });

    describe('The controller', function(){
        var ctrl,
            scope,
            notifier,
            auth;
        beforeEach(inject(function($controller, $rootScope, mvNotifier, mvAuth){
            scope = $rootScope.$new();
            notifier = mvNotifier;
            auth = mvAuth;
            ctrl = $controller('mvNavBarLoginCtrl', {$scope: scope, mvNotifier: notifier, mvAuth: auth});

        }));
        it('should call the notifier upon login success', inject(function(){
            spyOn(auth, "authenticateUser");
            scope.signin('jrassier@outlook.com', 'justin');
            expect(auth.authenticateUser).toHaveBeenCalled();
        }))

    });

});
*/
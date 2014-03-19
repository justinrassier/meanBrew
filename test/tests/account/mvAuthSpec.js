//a simple object for spying on promise callbacks
var TestMethods = function(){};
TestMethods.prototype= function(){
    var onCreateUserSuccess= function(){},
        onCreateUserFailure = function(reason){},
        onAuthenticateUser = function(success){};
    return{
        onCreateUserSuccess: onCreateUserSuccess,
        onCreateUserFailure: onCreateUserFailure,
        onAuthenticateUser : onAuthenticateUser
    }
}();

describe("mvAuth", function(){
    var methods = new TestMethods();
    beforeEach(function(){
        module('app');
    });

    describe("AuthenticateUser", function(){
        it("should resolve its promise with a success when a user is successfully authenticated", inject(function($httpBackend, mvAuth){
            $httpBackend.expectPOST('/login').respond({success: true, user:{firstName: "Justin", lastName: "Rassier"}});
            //create spy
            spyOn(methods, "onAuthenticateUser");

            mvAuth.authenticateUser('justinrassier@outlook.com', 'justin').then(methods.onAuthenticateUser);
            $httpBackend.flush();

            expect(methods.onAuthenticateUser).toHaveBeenCalledWith(true);
        }));
        it("should resolve its promise with a failure when a user is not authenticated", inject(function($httpBackend, mvAuth){
            $httpBackend.expectPOST('/login').respond({success: false, user:{firstName: "Justin", lastName: "Rassier"}});
            //create spy
            spyOn(methods, "onAuthenticateUser");

            mvAuth.authenticateUser('justinrassier@outlook.com', 'justin').then(methods.onAuthenticateUser);
            $httpBackend.flush();

            expect(methods.onAuthenticateUser).toHaveBeenCalledWith(false);
        }));
       it("should attach authenticated user to mvIdentity.currentUser", inject(function($httpBackend, mvAuth, mvIdentity){
           $httpBackend.expectPOST('/login').respond({success: true, user:{firstName: "Justin", lastName: "Rassier"}});

           mvAuth.authenticateUser('justinrassier@outlook.com', 'justin').then(function(success){
                expect(success).toBe(true);
                expect(mvIdentity.currentUser.firstName).toBe("Justin");
            });
           //execute the post by the authenticateUser call which will fulfill the promise
           $httpBackend.flush();
       }));
        it("should not attach an authenticated user to mvIdneity.currentUser on a failure", inject(function($httpBackend, mvAuth, mvIdentity){
            $httpBackend.expectPOST('/login').respond({success: false, user:{firstName: "Justin", lastName: "Rassier"}});

            mvAuth.authenticateUser('justinrassier@outlook.com', 'justin').then(function(success){
                expect(success).toBe(false);
                expect(mvIdentity.currentUser).toBeUndefined();
            });
            //execute the post by the authenticateUser call which will fulfill the promise
            $httpBackend.flush();
        }));
    });
    describe("Create User", function(){
        it("should attach the new user to mvIdentity.CurrentUser upon a successful response", inject(function(mvAuth, $httpBackend, mvIdentity){
            $httpBackend.expectPOST('/api/users').respond();

            mvAuth.createUser({firstName: "Justin", lastName:"Rassier"}).then(function(){
                expect(mvIdentity.currentUser.firstName).toBe('Justin');
            });
            $httpBackend.flush();
        }));
        it("should contain a message when failing to create", inject(function($httpBackend, mvAuth, mvIdentity, $window){
            $httpBackend.expectPOST('/api/users').respond(400,{reason:"duplicate user name"});
            spyOn(methods,'onCreateUserFailure');

            mvAuth.createUser({firstName: "Justin", lastName:"Rassier"}).then(function(){
            },methods.onCreateUserFailure);
            $httpBackend.flush();

            expect(methods.onCreateUserFailure).toHaveBeenCalledWith("duplicate user name");
        }))
    });

})
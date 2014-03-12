describe("mvAuth", function(){
    beforeEach(function(){
        module('app');
    });

    describe("AuthenticateUser", function(){

        beforeEach(inject(function($httpBackend){
            $httpBackend.expectPOST('/login').respond({success: true, user:{firstName: "Justin", lastName: "Rassier"}});
        }))

       it("should attach authenticated user to mvIdentity.currentUser", inject(function($httpBackend, mvAuth, mvIdentity){
           //this feels like I should also be using a spy somehow, otherwise we wouldn't know that
           //the promise was actually called as it wouldn't fail
            mvAuth.authenticateUser('justinrassier@outlook.com', 'justin').then(function(success){
                expect(success).toBe(true);
                expect(mvIdentity.currentUser.firstName).toBe("Justin");
            });

           //execute the post by the authenticateUser call which will fulfill the promise
           $httpBackend.flush();
       }))
    });

})
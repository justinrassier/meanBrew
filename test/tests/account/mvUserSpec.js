describe('mvUser', function(){
    beforeEach(module('app'));

    describe('isAdmin',function(){
        it('should return false if the roles array does not have an admin entry', inject(function(mvUser){
            var user = new mvUser();
            user.roles = ["not admin"];
            expect(user.isAdmin()).toBeFalsy();

        }));

        it('should return true if the role array has an admin entry', inject(function(mvUser){
            var user = new mvUser();
            user.roles = ['admin'];
            expect(user.isAdmin()).toBeTruthy();
        }));


    });

    describe('Resource Query', function(){
        beforeEach(inject(function($resource, $httpBackend){

        }));
        it('Should return a single user based on ID', inject(function($httpBackend, mvUser){
            $httpBackend.expectGET('/api/users/1').respond([{firstName: "Justin"}]);
            var result = mvUser.query({_id: 1});
            $httpBackend.flush();


            expect(result.length).toNotBe(0);
            expect(result[0].firstName).toEqual('Justin');
        }))
    })
})
describe('mvUser', function(){
    beforeEach(module('app'));

    describe('isAdmin',function(){
        it('should return false if the roles array does not have an admin entry', inject(function(mvUser){
            var user = new mvUser();
            user.roles = ["not admin"];
            expect(user.isAdmin()).toBe.false;
        }));

        it('should return true if the role array has an admin entry', inject(function(mvUser){
            var user = new mvUser();
            user.roles = ['admin'];
            expect(user.isAdmin()).toBe.true;
        }));
    });
})
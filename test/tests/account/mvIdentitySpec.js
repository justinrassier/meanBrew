describe('mvIdentity', function(){
    beforeEach( function(){
        module('app');

    });

    describe('The Current User', function(){

        beforeEach(inject(function($window){
            $window.bootstrappedUserObject = {firstName: "Justin", lastName: "Rassier"}
        }));

        it('Should be defined', inject(function(mvIdentity){
            expect(mvIdentity.currentUser).not.toBeUndefined();
        }));
    })
});
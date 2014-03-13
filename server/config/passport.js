var mongoose = require('mongoose'),
    passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    User = mongoose.model('User'),
    UserViewModel = require('../viewModels/UserViewModel').UserViewModel;


module.exports = function(){
    //passport local authentication.

    passport.use(new LocalStrategy(
        function(username, password, done){
            //verify username and password are correct and pass to done callback
            User.findOne({username: username}).exec(function(err,user){
                if(user && user.authenticate(password)){
                    return done(null,user); //I think done goes to what calls authenticate (i.e. called from our route)
                }
                else{
                    return done(null,false);
                }
            });
        }
    ));


    //need to tell passport how to serialize and deserialize a user
    passport.serializeUser(function(user,done){
        if(user){
            done(null,user._id);
        }
    });
    passport.deserializeUser(function(id,done){
        User.findOne({_id:id}).exec(function(err,user){
            if(user){
                return done(null, new UserViewModel(user));
            }
            else{
                return done(null, false);
            }
        });
    });
}
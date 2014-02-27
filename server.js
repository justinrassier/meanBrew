var express = require('express'),
    mongoose = require('mongoose'),
    passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy;

//gets node environment if available, if not, set it ot dev
var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';
var app = express();
var config = require('./server/config/config')[env];

require('./server/config/express')(app,config);
require('./server/config/mongoose')(config);


//passport local authentication.
var User = mongoose.model('User');
passport.use(new LocalStrategy(
    function(username, password, done){
        //verify username and password are correct and pass to done callback
        User.findOne({username: username}).exec(function(err,user){
            if(user){
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
            return done(null,user);
        }
        else{
            return done(null, false);
        }
    });
});



require('./server/config/routes')(app);

//startup the express web server on port defined in config
app.listen(config.port);
console.log("listening on port "+ config.port + '...');
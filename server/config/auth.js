var passport= require('passport'),
    UserViewModel = require('../viewModels/UserViewModel').UserViewModel;

exports.authenticate = function(req, res, next){
    //make login case insensitive 
    req.body.username = req.body.username.toLowerCase();

    //call authenticate that takes the strategy name (local) and a callback.
    //This is called from the stuff we setup in the server.js that authenticates the user
    var auth = passport.authenticate('local',function(err,user){
        if (err) {return next(err);}
        if(!user){return res.send({success:false})}

        req.logIn(user, function(err){
            if(err){return next(err);}
            res.send({success:true, user: new UserViewModel(user)});
        });
    });
    auth(req,res,next);
};

//middleware for API routes to check if authenticated
exports.requiresApiLogin = function(req,res,next){
    if(!req.isAuthenticated()){
        res.status(403);
        res.end();
    }
    else{
        next();
    }
};

exports.requiresRole = function(role){
    //express needs a function to be returned to use as middlware
    return function(req,res,next){
        if(!req.isAuthenticated || req.user.roles.indexOf(role) === -1){
            res.status(403);
            res.end();
        }
        else{
            next();
        }
    };
};
var passport = require('passport');

module.exports = function(app){

    //render out jade partials
    app.get('/partials/*', function(req,res){
        res.render('../../public/app/' + req.params);
    });

    app.post('/login',function(req, res, next){
        //call authenticate that takes the strategy name (local) and a callback.
        //This is called from the stuff we setup in the server.js that authenticates the user
        var auth = passport.authenticate('local',function(err,user){
            if (err) {return next(err);}
            if(!user){return res.send({success:false})};

            req.logIn(user, function(err){
                if(err){return next(err);}
                res.send({success:true, user: user});
            })
        });

        auth(req,res,next);

    });

    //catch-all route to serve up the index
    app.get('*', function(req, res){
        res.render('index');

    });


}
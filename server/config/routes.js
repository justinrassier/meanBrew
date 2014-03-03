var auth = require('./auth');

module.exports = function(app){

    //render out jade partials
    app.get('/partials/*', function(req,res){
        res.render('../../public/app/' + req.params);
    });


    //TODO: Don't send full user object to client! Right now hashed passwords go up the wire
    app.post('/login',auth.authenticate);

    app.post('/logout', function(req,res){
        console.log('signing out');
        //request has a logout method that was attached by the passport module
        req.logout();
        res.end();

    });

    //catch-all route to serve up the index
    app.get('*', function(req, res){
        //send up the current user with every request to the index page. Jade looks for this
        // and then stringifies and attaches it to the browser window dom object for use
        res.render('index', {
            bootstrappedUser: req.user
        });

    });


}
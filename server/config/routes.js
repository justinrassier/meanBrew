var auth = require('./auth'),
    users = require('../controllers/users/users'),
    mongoose = require('mongoose'),
    User = mongoose.model('User'),
    UserViewModel = require('../viewModels/UserViewModel').UserViewModel;

module.exports = function(app){

    //some api routes. Use the middleware we created in auth.js to check if authenticated
    app.get('/api/users', auth.requiresRole('admin'), users.getUsers);
    app.post('/api/users', users.createUser);
    app.put('/api/users', users.updateUser);

    //render out jade partials
    app.get('/partials/*', function(req,res){
        res.render('../../public/app/' + req.params);
    });



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
        var model;
        if(req.user){
            model  = new UserViewModel(req.user);
        }
        res.render('index', {
            bootstrappedUser: model
        });

    });


}
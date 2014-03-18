var mongoose = require('mongoose'),
    recipeModel = require('../models/Recipe'), //need this here to register the mongoose models in order
    userModel = require('../models/User'),
    seeder = require('./seed');

module.exports = function(config){

//connect mongoose to MongoDB
    mongoose.connect(config.db);

    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error'));
    db.once('open', function callback() {
        console.log('db opened');
    });

    seeder.seedUsers();
};


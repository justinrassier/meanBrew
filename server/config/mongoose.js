var mongoose = require('mongoose');

module.exports = function(config){

//connect mongoose to MongoDB
    mongoose.connect(config.db);

    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error'));
    db.once('open', function callback() {
        console.log('kegbot db opened');
    });


    var userSchema = mongoose.Schema({
        firstName: String,
        lastName: String,
        username: String
    });

    var User  = mongoose.model('User', userSchema);
    //select all
    User.find({}).exec(function(err, collection){
        if(collection.length === 0 ){
            console.log('seeding some users');
            User.create({firstName: "Justin", lastName: "Rassier", username: "justinrassier"});
            User.create({firstName: "Matt", lastName: "Richards", username: "mattrichards"});
            User.create({firstName: "Devon", lastName: "Baumgarten", username: "devonbaumgarten"});
        }

    });


}
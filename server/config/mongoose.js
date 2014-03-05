var mongoose = require('mongoose'),
    encrypt = require('../utilities/encryption')

module.exports = function(config){

//connect mongoose to MongoDB
    mongoose.connect(config.db);

    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error'));
    db.once('open', function callback() {
        console.log('db opened');
    });


    var userSchema = mongoose.Schema({
        firstName: String,
        lastName: String,
        username: String,
        salt: String,
        hashed_pwd: String,
        roles: [String]
    });

    userSchema.methods ={
        authenticate: function(passwordToMatch){
            return encrypt.hashPwd(this.salt, passwordToMatch) === this.hashed_pwd;
        }
    };

    var User  = mongoose.model('User', userSchema);
    //select all
    User.find({}).exec(function(err, collection){
        if(collection.length === 0 ){
            console.log('seeding some users');
            var salt,hash;
            //use stubbed in password of username for now
            salt = encrypt.createSalt();
            hash = encrypt.hashPwd(salt,'justin');
            User.create({firstName: "Justin", lastName: "Rassier", username: "justinrassier", salt: salt, hashed_pwd: hash, roles: ['admin']});
            salt = encrypt.createSalt();
            hash = encrypt.hashPwd(salt,'matt');
            User.create({firstName: "Matt", lastName: "Richards", username: "mattrichards", salt: salt, hashed_pwd: hash, roles: []});
            salt = encrypt.createSalt();
            hash = encrypt.hashPwd(salt,'devon');
            User.create({firstName: "Devon", lastName: "Baumgarten", username: "devonbaumgarten", salt: salt, hashed_pwd: hash});
        }

    });


}


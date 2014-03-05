var mongoose = require('mongoose'),
    encrypt = require('../utilities/encryption');

var userSchema = mongoose.Schema({
    firstName: {type: String, required:'{PATH} is required!'},
    lastName: {type: String, required:'{PATH} is required!'},
    username: {
        type: String,
        required: '{PATH} is required!',
        unique: true // will create a unique index within mongodb database
    },
    salt: {type: String, required:'{PATH} is required!'},
    hashed_pwd: {type: String, required:'{PATH} is required!'},
    roles: [String]
});

userSchema.methods ={
    authenticate: function(passwordToMatch){
        return encrypt.hashPwd(this.salt, passwordToMatch) === this.hashed_pwd;
    },
    hasRole: function(role){
        return this.roles.indexOf(role) > -1;
    }
};

var User  = mongoose.model('User', userSchema);

function createDefaultUsers(){
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


exports.createDefaultUsers = createDefaultUsers;
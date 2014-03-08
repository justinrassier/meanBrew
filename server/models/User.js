var mongoose = require('mongoose'),
    encrypt = require('../utilities/encryption'),
    Recipe = mongoose.model('Recipe');

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
    roles: [String],
    recipes: [Recipe.schema]
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


seeder = require('../config/seed');
function createDefaultUsers(){
    seeder.seedUsers();
}


exports.createDefaultUsers = createDefaultUsers;

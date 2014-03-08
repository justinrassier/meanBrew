var mongoose= require('mongoose'),
    User = mongoose.model('User'),
    Recipe = mongoose.model('Recipe'),
    encrypt = require('../utilities/encryption');


exports.seedUsers = function () {
    User.find({}).exec(function (err, collection) {
        if(collection.length > 0){
            User.remove({},function(err){if(!err){console.log('db cleared')}});
        }
        console.log('seeding some users');


        var recipes = [new Recipe({name: "Justins Stout", style: "American Stout"})];
        var justin = createUser('justinrassier@outlook.com', 'justin','Justin', 'Rassier', ['admin'],recipes);

        justin.save(function(err){ if(!err){console.log('user saved')}});


        var matt = createUser('mrmattrichards@gmail.com', 'matt','Matt', 'Richards', ['admin']);
        matt.save(function(err){});


    })
};
function createUser(username, password, firstName, lastName, roles, recipes){
    var salt = encrypt.createSalt();
    var hash = encrypt.hashPwd(salt,password);

    return new User({
        firstName: firstName,
        lastName: lastName,
        username: username,
        salt: salt,
        hashed_pwd: hash,
        roles: roles,
        recipes: recipes
    });
}
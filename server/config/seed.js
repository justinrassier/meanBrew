var mongoose= require('mongoose'),
    User = mongoose.model('User'),
    Recipe = mongoose.model('Recipe'),
    encrypt = require('../utilities/encryption');

var recipes = [new Recipe({name: "Justin's Stout", style: "American Stout", description: "A dark and awesome beer"}),
    new Recipe({name: "Hope and King Clone", style: "Scotch Ale", description: "Award winning clone"}),
    new Recipe({name: "Harvenger", style: "Black IPA", description: "Black and hoppy"}),
    new Recipe({name: "Standard Pale", style:"American Pale Ale", description: "Clean and refreshing"}),
    new Recipe({name: "Piss Water", style: "American Light Lager", description:"Why waste your time making this?? WHYYYY!?"}),
    new Recipe({name:'Bitter Bitter Bitter', style: "IPA", description: "For the hop lover"}),
    new Recipe({name:'The Darkness', style: "Russian Imperial Stout", description: "Best beer style ever"}),
    new Recipe({name:'Plain ole Porter', style: "Baltic Porter", description: "Kinda like black butte"})];


exports.seedUsers = function () {
    User.find({}).exec(function (err, collection) {
        if(collection.length > 0){
            User.remove({},function(err){if(!err){console.log('db cleared')}});
        }
        console.log('seeding some users');

        
        var justin = createUser('justinrassier@outlook.com', 'justin','Justin', 'Rassier', ['admin'],recipes);

        justin.save(function(err){ if(!err){console.log('user saved')}});


        var matt = createUser('mrmattrichards@gmail.com', 'matt','Matt', 'Richards', ['admin']);
        matt.save(function(err){});


    });
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
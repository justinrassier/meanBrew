var mongoose= require('mongoose'),
    User = mongoose.model('User'),
    Recipe = mongoose.model('Recipe'),
    Style = mongoose.model('Style'),
    encrypt = require('../utilities/encryption'),
    fs =  require('fs'),
    xml2js = require('xml2js');







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
            User.remove({},function(err){if(!err){console.log('users cleared')}});
        }
        console.log('seeding some users');

        var justin = createUser('justinrassier@outlook.com', 'justin','Justin', 'Rassier', ['admin'],recipes);
        justin.save(function(err){ });


        var matt = createUser('mrmattrichards@gmail.com', 'matt','Matt', 'Richards', ['admin']);
        matt.save(function(err){});
    });
};


exports.seedStyles = function(){
    parser = xml2js.Parser();
    var styles = [];
    fs.readFile(__dirname+'/styleguide2008.xml', function(err, data){
        parser.parseString(data, function(err,result){

            //category [0] is beer
            result.styleguide.class[0].category.forEach(function(category){
                var style = new Style();
                style.categoryName = category.name;
                style.categoryNumber = category.$.id;
                category.subcategory.forEach(function(subStyle){


                    var sub = {categoryName: subStyle.name,
                        categoryNumber: subStyle.$.id,
                        aroma: subStyle.aroma,
                        appearance: subStyle.appearance,
                        flavor: subStyle.flavor,
                        mouthfeel: subStyle.mouthfeel,
                        impression: subStyle.impression,
                        comments: subStyle.comments,
                        ingredients: subStyle.ingredients,
                        stats: [],
                        examples: subStyle.examples
                    };
                    
                    sub.stats.push(parseStat(subStyle.stats[0]));
                    style.subStyles.push(subStyle.stats[0]);
                    console.log(sub.stats[0].exceptions);
                    function parseStat(stat){
                        var result = {og: [], fg: [], abv: []};
                        if(stat.og){
                            result.og.push({low: stat.og[0].low[0], high: stat.og[0].high[0]});
                        }
                        if(stat.fg){
                            result.fg.push({low: stat.fg[0].low[0], high: stat.og[0].high[0]});
                        }
                        if(stat.abv){
                            result.abv.push({low: stat.abv[0].low[0], high: stat.abv[0].high[0]});
                        }
                        if(stat.exceptions){
                            result.exceptions = stat.exceptions[0];
                        }
                        return result;
                    }
                    
                });
                styles.push(style);
            });
            //var newStyle = new Style(styles[0]);
            //console.log(styles[0].subStyles[0].stats);

        });
    });

//  Style.find({}).exec(function(err, collection){
//      if(collection.length > 0){
//          Style.remove({}, function(err){if(!err){console.log('styles cleared')}});
//      }
//      console.log('seeding styles');
//
//      for(var i = 0; i< styles.length; i++){
//          styles[i].save(function(err){})
//      }
//  });
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
var Recipe = require('mongoose').model('Recipe'),
    User = require('mongoose').model('User');

function findRecipeById(recipeId, callback){
    User.findOne({recipes: {$elemMatch: {_id: recipeId}}},{recipes: {$elemMatch: {_id: recipeId}}},function(err,user){
        if(err || !user || user.recipes.length === 0){
            //should do something better with this error
            return callback(null);
        }
        else{
            console.log(user.recipes[0]);
            return callback(user.recipes[0]);
        }
    });
};
function findUserByRecipeId(recipeId, callback){
    User.findOne({recipes: {$elemMatch: {_id: recipeId}}},function(err,user){
        callback(user);
    });
};


exports.getRecipeById = function(req,res,next){
    var recipeId = req.params._id;
    //find the user with the given recipe. Mongo can't project a sub document from an array from what it sounds like
    findRecipeById(recipeId, function(recipe){
        if(!recipe){return res.send(400, 'No recipe found for ID');}
        //angular expects an array for the resource
        return res.send([recipe]);
    });

}

exports.createRecipeForUser = function(req,res, next){
    var recipeData = req.body;
    console.log(recipeData);

    var recipe = new Recipe(recipeData);
    var currentUser = req.user;
    currentUser.recipes.push(recipe);
    currentUser.save(function(err){
        if(err){res.status(400); res.send({reason: err.toString()})}
        res.send(recipe);
    });
};

exports.updateRecipe = function(req,res,next){
    var recipeData = req.body;
    //find the parent user object, as mongoose works on the parent collection
    findUserByRecipeId(recipeData._id, function(user)
    {
        for(var i = 0; i < user.recipes.length; i++){
            if(user.recipes[i]._id == recipeData._id){
                user.recipes[i].name = recipeData.name;
                user.recipes[i].style = recipeData.style;
                user.recipes[i].description = recipeData. description;
            }
        }
        user.save(function(err){
            res.send(user.recipes[i]);
        });

    });

};
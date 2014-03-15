var Recipe = require('mongoose').model('Recipe'),
    User = require('mongoose').model('User');

exports.getRecipeById = function(req,res,next){
    var recipeId = req.params._id;
    //find the user with the given recipe. Mongo can't project a sub document from an array from what it sounds like
    User.findOne({recipes: {$elemMatch: {_id: recipeId}}},function(err,user){
        if(err || !user){next(err);}
        else{
            for(var i = 0; i < user.recipes.length; i++){
                //need == as it needs type coercion to match the _id I guess
                if(user.recipes[i]._id == recipeId){
                    console.log('found the recipe');
                    //angular expects an array back
                    return res.send([user.recipes[i]]);
                }

            }
            return res.send(400, 'No recipe found for ID');
       }
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
}
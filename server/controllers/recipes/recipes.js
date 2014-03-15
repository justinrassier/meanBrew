var Recipe = require('mongoose').model('Recipe');

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
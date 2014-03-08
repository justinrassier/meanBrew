var mongoose = require('mongoose');

var recipeSchema = mongoose.Schema({
    name: {type: String, required: '{PATH} is required!'},
    style: String
});

mongoose.model('Recipe', recipeSchema);
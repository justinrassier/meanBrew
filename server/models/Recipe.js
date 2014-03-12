var mongoose = require('mongoose');

var recipeSchema = mongoose.Schema({
    name: {type: String, required: '{PATH} is required!'},
    style: String,
    description: String
});

//register with mongoose
mongoose.model('Recipe', recipeSchema);
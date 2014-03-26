var mongoose = require('mongoose');



var statSchema = mongoose.Schema({
    low: String,
    high: String
});

var statsSchema = mongoose.Schema({
    og: String,
    fg: String,
    abv: String,
    exceptions: String
});

var subStyleSchema = mongoose.Schema({
    categoryName: String,
    categoryNumber: String,
    aroma: String,
    appearance: String,
    flavor: String,
    mouthfeel: String,
    impression: String,
    comments: String,
    ingredients: String,
    stats: []

});


var styleSchema = mongoose.Schema({
    categoryName : String,
    categoryNumber: String,
    subStyles: [subStyleSchema]
});

mongoose.model('Style', styleSchema);
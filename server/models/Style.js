var mongoose = require('mongoose');



var statSchema = mongoose.Schema({
    low: String,
    high: String,
    varies: Boolean
});

var statsSchema = mongoose.Schema({
    og: [statSchema],
    fg: [statSchema],
    abv: [statSchema],
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
    stats: [statsSchema],
    examples: String

});


var styleSchema = mongoose.Schema({
    categoryName : String,
    categoryNumber: String,
    subStyles: [subStyleSchema]
});

mongoose.model('Style', styleSchema);
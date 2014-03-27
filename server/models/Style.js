var mongoose = require('mongoose');

//NOTE: mongoose is strangely limited to subdocuments being required to be part of an array.

var statSchema = mongoose.Schema({
    low: String,
    high: String,
    flexible: Boolean
});

var statsSchema = mongoose.Schema({
    og: [statSchema],
    fg: [statSchema],
    abv: [statSchema],
    srm: [statSchema],
    ibu:[statSchema],
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
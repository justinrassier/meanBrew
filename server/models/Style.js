var mongoose = require('mongoose');

var subStyleSchema = mongoose.Schema({
    categoryName: String,
    categoryNumber: String,
    aroma: String,
    appearance: String,
    flavor: String,
    mouthfeel: String,
    overallImpression: String,
    comments: String,
    ingredients: String,
    ibuMin: Number,
    ibuMax: Number,
    srmMin: Number,
    srmMax: Number,
    ogMin: Number,
    ogMax: Number,
    fgMin: Number,
    fgMax: Number,
    abvMin: Number,
    abvMax: Number
});


var styleSchema = mongoose.Schema({
    categoryName : String,
    categoryNumber: String,
    subStyles: [subStyleSchema]
});

mongoose.model('Style', styleSchema);
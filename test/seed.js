var seeder = function(){
    var recipes = [{_id: 1234, name: "Justin's Stout", style: "American Stout", description: "A dark and awesome beer"}];
    var styles =[{
        "categoryName" : "Light Lager",
        "_id" : "5335c039f75525ae0cfa1385",
        "subStyles" : [
            {
                "categoryName" : "Lite American Lager",
                "categoryNumber" : "1A",
                "_id" : "5335c039f75525ae0cfa1386"
            },
            {
                "categoryName" : "Standard American Lager",
                "categoryNumber" : "1B",
                "_id" : "5335c039f75525ae0cfa138d"
            },
            {
                "categoryName" : "Premium American Lager",
                "categoryNumber" : "1C",
                "_id" : "5335c039f75525ae0cfa1394"
            },
            {
                "categoryName" : "Munich Helles",
                "categoryNumber" : "1D",
                "_id" : "5335c039f75525ae0cfa139b"
            },
            {
                "categoryName" : "Dortmunder Export",
                "categoryNumber" : "1E",
                "_id" : "5335c039f75525ae0cfa13a2"
            }
        ]
    }];
    return {
        recipes: recipes,
        styles: styles
    }
}();
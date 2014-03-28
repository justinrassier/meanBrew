var Style = require('mongoose').model('Style');

exports.getAllStyles = function(req,res,next){
    Style.find({"$query" :{}, "$orderby" : {"categoryNumber": 1}},
        {"subStyles._id": 1,
            "categoryName": 1,
            "subStyles.categoryName": 1,
            "subStyles.categoryNumber": 1},
        function(err, styles){
            if(err){return res.send(400);}
            return res.send(styles);
    });
};
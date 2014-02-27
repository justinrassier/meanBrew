var express = require('express'),
    stylus = require('stylus'),
    mongoose = require('mongoose');

//gets node environment if available, if not, set it ot dev
var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var app = express();

//setup stylus compiler
function compile(str, path){
    return stylus(str).set('filename', path);
}

app.configure(function(){
    //set the server views folder. I believe call to render will automatically point heres
	app.set('views', __dirname+ '/server/views');

    //set jade as view engine
	app.set('view engine', 'jade');

    //express routing
    app.use(express.logger('dev'));

    //express body parser -- not 100% sure what this is for
    app.use(express.bodyParser());

    //setup stylus compiler for CSS
    app.use(stylus.middleware(
        {
            src: __dirname+ '/public',
            compile: compile
        }
    ));

    //setup static route to the public folder for static content
    app.use(express.static(__dirname + '/public'));
});

//connect mongoose to MongoDB
if(env === 'development'){
    mongoose.connect('mongodb://localhost/basicMean');
}else{
    mongoose.connect('mongodb://justinrassier:V4LknrMGaipw7Ba@ds033059.mongolab.com:33059/basicmean');
}


var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', function callback() {
   console.log('kegbot db opened');
});



//render out jade partials
app.get('/partials/*', function(req,res){
    res.render('../../public/app/' + req.params);
});

//catch-all route to serve up the index
app.get('*', function(req, res){
res.render('index');

});

//startup the express web server on port 3030
var port = process.env.PORT  || 3030;
app.listen(port);

console.log("listening on port "+ port + '...');
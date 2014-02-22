var express = require('express'),
    stylus = require('stylus'),
    mongoose = require('mongoose');

//gets node environment
var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var app = express();

//setup stylus
function compile(str, path){
    return stylus(str).set('filename', path);
}

app.configure(function(){
    //set the server views folder
	app.set('views', __dirname+ '/server/views');

    //set jade as view engine
	app.set('view engine', 'jade');

    //express routing
    app.use(express.logger('dev'));

    //express body parser -- parse the body of the documents that are
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

mongoose.connect('mongodb://localhost/kegbot');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', function callback() {
   console.log('kegbot db opened');
});
var messageSchema = mongoose.Schema({message: String});
var Message = mongoose.model('Message', messageSchema);
var mongoMessage;
Message.findOne().exec(function(err, messageDoc){
    mongoMessage = messageDoc.message;

});



//render out jade partials
app.get('/partials/:partialPath', function(req,res){

    res.render('partials/' + req.params.partialPath);
});

app.get('*', function(req, res){
res.render('index', {
    mongoMessage: mongoMessage
});

});

var port = 3030;
app.listen(port);

console.log("listening on port "+ port + '...');
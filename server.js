var express = require('express');

//gets node environment if available, if not, set it ot dev In something like heroku you
// can set this with a command so that when published, it automatically knows it is production
var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var app = express();

var config = require('./server/config/config')[env];

//setup express
require('./server/config/express')(app,config);

//connect to mongodb
require('./server/config/mongoose')(config);

//setup authentication
require('./server/config/passport')();

//configure express routes
require('./server/config/routes')(app);

//startup the express web server on port defined in config
app.listen(config.port);
console.log("listening on port "+ config.port + '...');
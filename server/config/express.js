var express = require('express'),
    stylus = require('stylus'),
    passport = require('passport'),
    sassMiddleware = require('node-sass-middleware');
    

module.exports = function (app, config) {
//setup stylus compiler
    function compile(str, path) {
        return stylus(str).set('filename', path);
    }

    app.configure(function () {
        //set the server views folder. I believe call to render will automatically point here
        app.set('views', config.rootPath + '/server/views');
        //set jade as view engine
        app.set('view engine', 'jade');
        //express routing
        app.use(express.logger('dev'));
        //cookie parser, used by passport for sessions
        app.use(express.cookieParser());
        //express body parser -- not 100% sure what this is for
        app.use(express.bodyParser());
        //session middleware
        app.use(express.session({secret: 'super secret string'}));
        //initialize passport
        app.use(passport.initialize());
        //tell passport to use sessions
        app.use(passport.session());

/*
        //setup stylus compiler for CSS
        app.use(stylus.middleware(
            {
                src: config.rootPath + '/public',
                compile: compile
            }
        ));
  */
        //use SASS middleware instead of stylus
        app.use(sassMiddleware({
            src: config.rootPath + '/public',
            dest: config.rootPath + '/public',
            debug: true,
            outputStyle: 'compressed',
            prefix:  '/prefix'
        }));

        //setup static route to the public folder for static content
        app.use(express.static(config.rootPath + '/public'));
    });
};
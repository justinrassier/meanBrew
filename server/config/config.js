var path = require('path');

var rootPath = path.normalize(__dirname + '/../..');

module.exports = {
    development: {
        rootPath: rootPath,
        db: 'mongodb://localhost/meanBrew',
        port: process.env.PORT || 8080

    },
    production: {
        rootPath: rootPath,
        db: '', //TODO: Setup when we get a real Heroku/MongoLab instance that we want to connect to
        port: process.env.PORT || 80
    },
    
    cloud9: {
        rootPath: rootPath,
        db: 'mongodb://justinrassier:V4LknrMGaipw7Ba@ds033059.mongolab.com:33059/basicmean',
        port: process.env.PORT
    }

}
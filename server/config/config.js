var path = require('path');

var rootPath = path.normalize(__dirname + '/../..');

module.exports = {
    development: {
        rootPath: rootPath,
        db: 'mongodb://localhost/meanBrew',
        port: process.env.PORT || 3030

    },
    production: {
        rootPath: rootPath,
        db: '', //TODO: Setup when we get a real Heroku/MongoLab instance that we want to connect to
        port: process.env.PORT || 80
    }

}
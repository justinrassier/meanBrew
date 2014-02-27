var path = require('path');

var rootPath = path.normalize(__dirname + '/../..');

module.exports = {
    development: {
        rootPath: rootPath,
        db: 'mongodb://localhost/basicMean',
        port: process.env.PORT || 3030

    },
    production: {
        rootPath: rootPath,
        db: 'mongodb://justinrassier:V4LknrMGaipw7Ba@ds033059.mongolab.com:33059/basicmean',
        port: process.env.PORT || 80
    }

}
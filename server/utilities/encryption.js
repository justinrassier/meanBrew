crypto = require('crypto');

exports.createSalt = function(){
    return crypto.randomBytes(128).toString('base64');
}
exports.hashPwd = function(salt, pwd){
    var hmac = crypto.createHmac('sha256',salt);
    return hmac.update(pwd).digest('hex');
}
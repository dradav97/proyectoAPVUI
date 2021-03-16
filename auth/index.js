const jwt = require('jsonwebtoken')
                     


// in this document generate the jwt
function sign(data){
    return jwt.sign(data, 'secreto')
}

module.exports= {
    sign,
}
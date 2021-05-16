const jwt = require('jsonwebtoken')
const config = require('../config')
const error= require('./../uitls/error')

const secret = config.jwt.secret

//.------------------------------------------------------------------------------------------------
// in this document generate the jwt
function sign(data){
    return jwt.sign(data, secret)
}
//.------------------------------------------------------------------------------------------------

/**
 * 
 * @param {String} token 
 * @returns return if the token is valid
 */
function verify(token){
    try{
        return jwt.verify(token,secret)
    } catch(error){
        throw new Error(error.message)
    }
    
}

//.------------------------------------------------------------------------------------------------

const check = {
    own: function(req,owner){
        const decoded=decodeHeader(req)
        console.log(decoded)

        //check if is own or not
        if(decoded.id!== owner){
            //error 401 = unauthorized 
            throw error('Not can do this', 401)            
        }
    }
}

//.------------------------------------------------------------------------------------------------
/**
 * clean the origin token
 * @param {String} auth 
 * @returns the token without the word 'Bearer' that is in origin format
 */
function getToken(auth){
    // the format of token is:
    // Bearer kfdasjfksdajfkdsfjhjkcvl

    // next we verify that have a token
    if(!auth){
        // error 400.9 look token invalid
        throw  error('Not have token',400.9)
    }    
    //verify the format of token
    if(auth.indexOf('Bearer ')===-1){
        throw error('lock token invalid', 400.9)         
    }
    //delete the word "Bearer" of the token
    let token = auth.replace('Bearer ','')
    return token
}
//.------------------------------------------------------------------------------------------------



//.------------------------------------------------------------------------------------------------
function decodeHeader(req){
    // authorization is the header that we want to receive
    const auhorization = req.headers.authorization || ''    
    const token = getToken(auhorization)
    const decoded= verify(token)
    req.user = decoded
    return decoded
}
//.------------------------------------------------------------------------------------------------

module.exports= {
    sign,
    check,
}
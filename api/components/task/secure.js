const auth = require('./../../../auth')
// this document export a middleware 

/**
 * 
 * function that export a middleware
 * @param {string} action 
 * @returns middleware that checkAuth
 */
module.exports = function checkAuth(action){
/**
 * this function do the middleware and compare that the user is the same that want update datas of this user
 * @param Json req 
 * @param json res 
 * @param any next 
 */
    function middleware(req, res, next){
        switch(action){
            case 'update':
                //
                const owner = req.body.id
                auth.check.own(req,owner) 
                next()
                break
            default:
                next()
        }
    }
    return middleware
}
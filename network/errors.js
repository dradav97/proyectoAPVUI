const response = require('./response')

/**
 * give format to error, just show name error, message and status; and not all datas of error 
 * @param {Error} err 
 * @param {JSON} req 
 * @param {JSON} res 
 * @param {any} next 
 */
function errors(err,req,res, next) {
    console.error('[error]',err)
    const message = err.message || 'Error interno'
    const status = err.statusCode || 500

    response.error(req,res,message,status)
}

module.exports= errors
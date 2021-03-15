const express= require('express')
const config = require('../config.js')
const user = require('./components/user/network')
// import swwagger library
const swaggerUi = require('swagger-ui-express')




const app = express()
app.use(express.json())
// import json document with documentation swagger
const swaggerDoc = require('./swagger.json')



//ROUTER
app.use('/api/user', user)
//add path for documentation
app.use('/api-docs',swaggerUi.serve, swaggerUi.setup(swaggerDoc))


app.listen(config.api.port, ()=> {
    console.log('Api escuchando en el puerto', config.api.port)
})
const express= require('express')
// import json document with documentation swagger
const swaggerDoc = require('./swagger.json')
// import swwagger library
const swaggerUi = require('swagger-ui-express') 

const config = require('../config.js')
const user = require('./components/user/network')
const auth = require('./components/auth/network')

const errors = require('../network/errors')


const app = express()
app.use(express.json())



//ROUTER
// ad path for module user administrator
app.use('/api/user', user)
//add path for documentation
app.use('/api-docs',swaggerUi.serve, swaggerUi.setup(swaggerDoc))
// ad path for login module
app.use('/api/auth',auth)

app.use(errors)

app.listen(config.api.port, ()=> {
    console.log('Api escuchando en el puerto', config.api.port)
})
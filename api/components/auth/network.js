const express = require('express')
const response = require('../../../network/response')
const controller = require('./index')
const router = express.Router()

// use to be able to read the body of a request
router.use(express.json())

//routes
router.post('/login',login)


function login(req,res){
    controller.login(req.body.username, req.body.password)
        .then(token => response.succes(req,res,token,200))
        .catch(err=> response.succes(req,res,"Informacion invalida",400))
}

//internal functions
module.exports = router
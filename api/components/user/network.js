const express = require('express')
const response = require('../../../network/response')
const controller = require('./index')
const router = express.Router()


// esto lo usamos para poder leer el body de un put 
router.use(express.json())

router.get('/', function(req, res){   
    controller.list()
        .then((lista)=>response.succes(req,res, lista, 200))
        .catch((err)=>response.error(req, res, err.message, 500))     
})

router.get('/:id', function(req, res){   
    controller.get(req.params.id)
        .then((user)=>response.succes(req,res, user, 200))
        .catch((err)=>response.error(req, res, err.message, 500))
    
})

router.post('/',function(req, res){
    controller.upsert(req.body)
        .then((user)=>response.succes(req, res, user, 200))
        .catch((err)=>response.error(req, res, err.message, 500))
})

router.delete('/:id', function(req, res){
    controller.delete(req.params.id)
        .then((id)=>response.succes(req, res, id, 200))
        .catch((err)=>response.error(req,res, err.message, 500))
})

module.exports = router
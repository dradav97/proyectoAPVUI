const express = require('express')
const response = require('../../../network/response')
const controller = require('./index')
const router = express.Router()

// use to be able to read the body of a request
router.use(express.json())

// Routes
router.get('/',list)
router.get('/:id',get)
router.post('/',upsert)
router.put('/',upsert)
router.delete('/:id',delet)


// Internal Functions
function list(req, res){   
    controller.list()
        .then((lista)=>response.succes(req,res, lista, 200))
        .catch((err)=>response.error(req, res, err.message, 500))     
}

function get(req, res){   
    controller.get(req.params.id)
        .then((user)=>response.succes(req,res, user, 200))
        .catch((err)=>response.error(req, res, err.message, 500))
    
}

function upsert(req, res){
    controller.upsert(req.body)
        .then((user)=>response.succes(req, res, user, 200))
        .catch((err)=>response.error(req, res, err.message, 500))
}

function delet(req, res){
    controller.delete(req.params.id)
    // pongo que responda con 204 por que indica que la solicitud se completo pero no devuelve información
        .then((id)=>response.succes(req, res, id, 204))
        .catch((err)=>response.error(req,res, err.message, 500))
}

module.exports = router
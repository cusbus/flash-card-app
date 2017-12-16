
'use strict';

const notesService = require('./services/notes.service')
const responses = require('../models/responses')
const apiPrefix = 'api/notes';

module.exports = {
    readAll: _readAll,
    readById: _readById,
    create: _create,
    update: _update,
    delete: _delete
}

function _readAll(req, res) {
    notesService.readAll()
        .then(notes => {
            const responseModel = new responses.ItemsResponse()
            responseModel.items = notes
            res.json(responseModel) 
        })
        .catch(err => {
            console.log(err)
            res.status(500).send(new responses.ErrorResponse(err))
        })
}

function _readById(req, res){

}

function _create(req, res){
    
    let note = {
        question: req.body.question,
        answer: req.body.answer,
        category: req.body.category
    }

    notesService.create(note)
        .then(id => {
            const responseModel = new responses.ItemResponse()
            responseModel.id = id
            res.status(201)
                .location(`${apiPrefix}/${id}`)
                .json(responseModel)
        })
        .catch(err => {
            console.log(err)
            res.status(500).send(new responses.ErrorResponse(err))
        })
}

function _update(req, res){
    // param will need to be id, note
}

function _delete(req, res){

}


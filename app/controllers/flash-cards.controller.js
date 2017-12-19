
'use strict';

const flashCardService = require('../services/flash-cards.service')
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
    flashCardService.readAll()
        .then(flashCards => {
            const responseModel = new responses.ItemsResponse()
            responseModel.items = flashCards
            res.json(responseModel) 
        })
        .catch(err => {
            console.log(err)
            res.status(500).send(new responses.ErrorResponse(err))
        })
}

function _readById(req, res){
    flashCardService.readById(req.params.id)
        .then(flashCard => {
            const responseModel = new responses.ItemResponse()
            responseModel.item = flashCard
            res.json(responseModel)
        })
        .catch(err => {
            console.log(err)
            res.status(500).send(new responses.ErrorResponse(err))
        })
}

function _create(req, res){
    
    let flashCard = {
        question: req.body.question,
        answer: req.body.answer,
        category: req.body.category,
        subCategory: req.body.subCategory
    }

    flashCardService.create(flashCard)
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
    // param will need to be id, flashCard
}

function _delete(req, res){

}


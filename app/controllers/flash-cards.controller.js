
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
    flashCardService.create(req.body)
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
    flashCardService.update(req.params.id, req.body)
        .then(result => {
            const responseModel = new responses.SuccessResponse()
            res.status(200).json(responseModel)
        })
        .catch(err => {
            console.log(err)
            res.status(500).send(new responses.ErrorResponse(err))
        })
}

function _delete(req, res){
    flashCardService.delete(req.params.id)
        .then(result => {
            const responseModel = new responses.SuccessResponse()
            res.status(200).json(responseModel)
        })
        .catch(err => {
            console.log(err)
            res.status(500).send(new responses.ErrorResponse(err))
        })
}


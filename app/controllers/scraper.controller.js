"use strict";

const scraperService = require('../services/scraper.service')
const responses = require('../models/responses')
const apiPrefix = 'api/scraper';

module.exports = {
    readAll: _readAll
}

function _readAll(req, res) {
    Promise.resolve(scraperService.readAll())
    scraperService.readAll()
        .then(headlines => {
            const responseModel = new responses.ItemsResponse()
            responseModel.items = headlines
            res.json(responseModel)
        })
        .catch(err => {
            console.log(err) 
            res.status(500).send(new responses.ErrorResponse(err))
        })
}
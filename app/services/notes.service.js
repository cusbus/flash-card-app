
'use strict';

// const cards = require('./models/cards')
const mongodb = require('../mongodb')
const conn = mongodb.connection
const ObjectId = mongodb.ObjectId

module.exports = {
    readAll: _readAll,
    readById: _readbyId,
    create: _create,
    update: _update,
    delete: _delete
}

function _readMap(card){
    card._id = card._id.toString()
    return card
}

function _readAll(){
    return conn.db().collection('notes').find().toArray()
        .then(cards => {
            cards.map(_readMap)
            return cards
        })
}

function _readById(id){
    return conn.db().collection('notes').findOne( {_id: new ObjectId(id) } ).toArray()
        .then(note => {
            note._id = note._id.toString()
            return note
        })
}

function _create(note){
    return conn.db().collection('notes').insert(note)
        .then(result => result.insertedIds[0].toString()) //return created id as string
}

function _update(id, question) {

}

function _delete(id) {

}

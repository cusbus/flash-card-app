
'use strict';

// const flashCards = require('./models/flashCards')
const mongodb = require('../mongodb')
const conn = mongodb.connection
const ObjectId = mongodb.ObjectId

module.exports = {
    readAll: _readAll,
    readById: _readById,
    create: _create,
    update: _update,
    delete: _delete
}

function _readMap(flashCard){
    flashCard._id = flashCard._id.toString()
    return flashCard
}

function _readAll(){
    return conn.db().collection('flashCards').find().toArray()
        .then(flashCards => {
            flashCards.map(_readMap)
            return flashCards
        })
}

function _readById(id){
    return conn.db().collection('flashCards').findOne( {_id: new ObjectId(id) } )
        .then(flashCard => {
            flashCard._id = flashCard._id.toString()
            return flashCard
        })
}

function _create(flashCard){
    let newFlashCard = {
        question: flashCard.question,
        answer: flashCard.answer,
        category: flashCard.category,
        subCategory: flashCard.subCategory,
        bucket: flashCard.bucket
    }

    return conn.db().collection('flashCards').insert(flashCard)
        .then(result => result.insertedIds[0].toString()) //return created id as string
}

function _update(id, flashCard) {
    let newFlashCard = {
        question: flashCard.question,
        answer: flashCard.answer,
        category: flashCard.category,
        subCategory: flashCard.subCategory,
        bucket: flashCard.bucket
    }
    return conn.db().collection('flashCards').updateOne({_id: new ObjectId(id)}, { $set: newFlashCard })
        .then(result => Promise.resolve())
}

function _delete(id) {
    return conn.db().collection('flashCards').deleteOne({_id: new ObjectId(id)})
        .then(result => Promise.resolve())
}

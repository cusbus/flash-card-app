const router = require('express').Router()
const flashCardsController = require('../controllers/flash-cards.controller')
// const validateBody = require('../filters/validate.body')
// const FlashCard = require('../models/flash-card')

module.exports = router

// API routes
router.get('/', flashCardsController.readAll)
router.get('/:id([0-9a-fA-F]{24})', flashCardsController.readById)
router.post('/', flashCardsController.create)
router.put('/:id([0-9a-fA-F]{24})', flashCardsController.update)
router.delete('/:id([0-9a-fA-F]{24})', flashCardsController.delete)
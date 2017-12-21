const router = require('express').Router()
const scraperController = require('../controllers/scraper.controller')

module.exports = router

// API routes
router.get('/', scraperController.readAll)

const router = require('express').Router()

const Controller = require('../controllers/Controller.js')

router.get('/:symbol', Controller.fetchApi)

module.exports = router
const express = require('express')
const routes = express.Router()
const IdeaController = require('../controller/IdeaController')

routes.get('/', IdeaController.store)

module.exports = routes
const express = require('express')
const routes = express.Router()
const IdeaController = require('../controller/IdeaController')
const UserController = require('../controller/UserController')

routes.post('/create', UserController.store)
routes.post('/ideas/create', IdeaController.store)
routes.delete('/delete/:_id', IdeaController.destroy)

module.exports = routes
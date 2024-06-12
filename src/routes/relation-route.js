const express = require('express')
const relationController = require('../controllers/relation-controller')

const relationRouter = express.Router()

relationRouter.post('/:eventId', relationController.createRealation)
relationRouter.get('/event/:eventId', relationController.getPlayerFromEventId)
relationRouter.get('/user/:userId', relationController.getEventByUserId)
relationRouter.delete('/event/:eventId', relationController.deleteRelationByUser)
relationRouter.delete('/event/:eventId/user/:userId', relationController.deleteRelationByCreator)
relationRouter.delete('/:eventId', relationController.deleteAllPlayerByEventId)

module.exports = relationRouter
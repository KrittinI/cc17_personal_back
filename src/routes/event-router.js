const express = require('express')
const eventController = require('../controllers/event-controller')

const eventRouter = express.Router()

eventRouter.post('/', eventController.createEvent)
eventRouter.get('/', eventController.getAllEvent)
eventRouter.get('/:eventId', eventController.getEventById)
// eventRouter.get('/:date', eventController.getEventByDate)
eventRouter.get('/court/:courtId', eventController.getEventByCourtId)
eventRouter.patch('/:eventId', eventController.updateEvent)
// eventRouter.delete('/:eventId', eventController.deleteEvent)


module.exports = eventRouter
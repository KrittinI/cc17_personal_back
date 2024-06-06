const express = require('express')
const courtController = require('../controllers/court-controller')

const courtRouter = express.Router()

courtRouter.post('/', courtController.createCourt)
courtRouter.get('/', courtController.getAllCourt)
courtRouter.get('/:courtId', courtController.getCourtById)
courtRouter.get('/:min/:max', courtController.getCourtByPrice)
courtRouter.patch('/:courtId', courtController.updateCourt)

module.exports = courtRouter
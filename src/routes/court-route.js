const express = require('express')
const courtController = require('../controllers/court-controller')
const authenticate = require('../middlewares/authenticate')

const courtRouter = express.Router()

courtRouter.post('/', authenticate, courtController.createCourt)
courtRouter.get('/', courtController.getAllCourt)
courtRouter.get('/:courtId', courtController.getCourtById)
courtRouter.get('/:min/:max', courtController.getCourtByPrice)
courtRouter.patch('/:courtId', authenticate, courtController.updateCourt)

module.exports = courtRouter
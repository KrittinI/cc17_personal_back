require('dotenv').config()
const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const authRouter = require('./routes/auth-route')
const notFoundMiddleware = require('./middlewares/not-found')
const errorMiddleware = require('./middlewares/error-middleware')
const userRouter = require('./routes/user-route')
const authenticate = require('./middlewares/authenticate')
const courtRouter = require('./routes/court-route')
const eventRouter = require('./routes/event-router')
const relationRouter = require('./routes/relation-route')
const proxy = require('./utils/proxy')

const app = express()

app.use(cors())
app.use(morgan('dev'))

app.use(express.json())


// app.use(proxy)
app.use('/auth', authRouter)
app.use('/users', authenticate, userRouter)
app.use('/courts', courtRouter)
app.use('/events', authenticate, eventRouter)
app.use('/relations', authenticate, relationRouter)

app.use(notFoundMiddleware)
app.use(errorMiddleware)

const PORT = process.env.PORT || 8000

app.listen(PORT, () => { console.log(`Hello personal project server ${PORT}`); })
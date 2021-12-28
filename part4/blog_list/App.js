const logger = require('./utils/logger')
const config = require('./utils/config')
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')


const mongoUrl = config.MONGODB_URI
logger.info(`connecting to ${mongoUrl}`)
mongoose.connect(mongoUrl)
    .then(
        logger.info(`mongoose connected succesfully`)
    )
    .catch(error => next(error))

app.use(cors())
app.use(express.json())


const usersRouter = require('./controllers/users')
const blogsRouter = require('./controllers/blogs')
const loginRouter = require('./controllers/login')
const tokenExtractor = require('./midlewares/tokenExtractor')
const userExtractor = require('./midlewares/userExtractor')

//app.use(tokenExtractor)
//app.use(userExtractor)
app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)

module.exports = app
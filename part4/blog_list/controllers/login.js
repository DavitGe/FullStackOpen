const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const loginRouter = require('express').Router()
const User = require('../models/user') //User model

loginRouter.post('/', async (request, response) => {
    const body = request.body

    const user = await User.findOne({ username: body.username }) //finding User
    const passwordCorrect = user === null
        ? false
        : await bcrypt.compare(body.password, user.passwordHash)

    if (!(user && passwordCorrect)) {
        return response.status(401).json({
            error: 'invalid username or password'
        })
    }

    const userForToken = { //creating info that will be stored in token
        username: user.username,
        id: user._id,
    }

    const token = jwt.sign(userForToken, process.env.SECRET) //creating token

    response
        .status(200)
        .send({ token, username: user.username, name: user.name })
})

module.exports = loginRouter
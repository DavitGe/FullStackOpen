const usersRouter = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcryptjs')



usersRouter.post('/', async (request, response) => {
    const body = request.body

    if (body.password == undefined || body.username == undefined || body.username.length < 3 || body.password.length < 3) {
        console.error('Bad request')
        response.status(400).end()
    } else {
        const saltRounds = 10
        const passwordHash = await bcrypt.hash(body.password, saltRounds)

        const user = await new User({
            username: body.username,
            name: body.name,
            passwordHash,
            blogs: [],
        })
        const savedUser = await user.save()

        response.json(savedUser)
    }

})

usersRouter.get('/', async (request, response) => {

    const users = await User.find({}).populate('blogs')
    response.json(users)
})

usersRouter.get('/:id', async (request, response) => {
    const user = await User.findById(request.params.id)

    if (user) {
        response.json(user)
        response.status(200).end()
    } else {
        console.error("Please enter valid ID")
        response.status(400).end()
    }
})

module.exports = usersRouter


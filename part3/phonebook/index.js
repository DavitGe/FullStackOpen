require('dotenv').config()
const express = require('express')
const app = express()
const morgan = require('morgan')
const mongoose = require('mongoose')

app.use(express.static('build'))
app.use(express.json())

morgan.token('personName', (request) => request.body.name)
morgan.token('num', (request) => request.body.number)
morgan.token('body', (request) => request.body)
///////////////////////////////////////
const errorHandler = (error, request, response, next) => {
    console.error(error.message)

    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' })
    }

    next(error)
}

// this has to be the last loaded middleware.
app.use(errorHandler)

const url = process.env.MONGODB_URI
const Person = require('./models/person')

console.log(`connecting to:`, url)

mongoose.connect(url)
    .then(() => {
        console.log('connected to MongoDB')
    })
    .catch((error) => {
        console.log('error connecting to MongoDB:', error.message)
    })





app.get('/', (request, response) => {
    response.send('<h1>Hello World!</h1>')
})

app.get('/api/persons', morgan(':body'), (request, response) => {
    Person.find({})
        .then(personss => {
            response.json(personss)
        })
})

app.get('/api/persons/:id', morgan(':body'), (request, response) => {
    Person.findById(request.params.id)
        .then(person => {
            if (person) {
                response.json(person)
            } else {
                console.log(`person with such id is not found`)
                response.status(404).end()
            }
        })
        .catch(error => {
            console.log(`error`, error)
            response.status(400).send({ error: 'malformatted id' })
        })

})

app.get('/info', morgan(':body'), (request, response) => {
    Person.find({}).then(personss => {
        var date = new Date();
        var info = '<p>Phonebook has info for ' + personss.length + ' persons </p><br/><p>' + date + '</p>'
        response.send(info)
    })
})

app.delete(('/api/persons/:id'), morgan(':body'), (request, response) => {
    Person.findByIdAndRemove(request.params.id)
        .then(() => response.status(204).end())
        .catch(() => response.status(404).end())
})

app.post('/api/persons', morgan(':personName :num :body'), (request, response) => {
    console.log("post")
    if (!request.body) {
        return response.status(400).json({
            error: 'content missing'
        })
    }

    if (!request.body.name || !request.body.number || request.body.name.length < 3 || request.body.number.lenght < 8) {
        return response.status(400).end()
    }
    Person.find({}).then(personss => {
        if (personss.find(per => per.name === request.body.name)) {
            return response.status(400).json({
                error: 'name must be unique'
            })
        }

        const person = new Person({
            name: request.body.name,
            number: request.body.number,
        })
        person.save().then(() => {
            response.status(201).end()
        })
    })
})

app.put('/api/persons/:id', (request, response, next) => {
    if (!request.body) {
        return response.status(400).json({
            error: 'content missing'
        })
    }
    if (!request.body.name || !request.body.number) {
        return response.status(400).json({
            error: 'content missing'
        })
    }
    const person = request.body
    console.log(request.params.id)
    Person.findByIdAndUpdate(request.params.id, person, { new: true })
        .then(updatedPerson => {
            response.json(updatedPerson)
        })
        .catch(error => next(error))
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
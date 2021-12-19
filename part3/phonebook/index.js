const express = require('express')
const app = express()
const morgan = require('morgan')

app.use(express.static('build'))
app.use(express.json())
morgan.token('personName', (request) => request.body.name)
morgan.token('num', (request) => request.body.number)
morgan.token('body', (request) => request.body)

let persons = [
    {
        "id": 1,
        "name": "Arto Hellas",
        "number": "040-123456"
    },
    {
        "id": 2,
        "name": "Ada Lovelace",
        "number": "39-44-5323523"
    },
    {
        "id": 3,
        "name": "Dan Abramov",
        "number": "12-43-234345"
    },
    {
        "id": 4,
        "name": "Mary Poppendieck",
        "number": "39-23-6423122"
    }
]



app.get('/', morgan(':body'), (request, response) => {
    response.send('<h1>Hello World!</h1>')
})

app.get('/api/persons', morgan(':body'), (request, response) => {
    response.json(persons)
})

app.get('/api/persons/:id', morgan(':body'), (request, response) => {
    const id = request.params.id
    const person = persons.find(person => person.id === Number(id))
    if (person) {
        response.json(person)
    } else {
        response.status(404).end()
    }
})

app.get('/info', morgan(':body'), (request, response) => {
    var date = new Date();
    var info = '<p>Phonebook has info for ' + persons.length + ' persons </p><br/><p>' + date + '</p>'
    response.send(info)
})

app.delete(('/api/persons/:id'), morgan(':body'), (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)

    response.status(204).end()
})

app.post('/api/persons', morgan(':personName :num :body'), (request, response) => {
    if (!request.body) {
        return response.status(400).json({
            error: 'content missing'
        })
    }
    const person = request.body
    if (!person.name || !person.number) {
        return response.status(400).json({
            error: 'content missing'
        })
    }
    if (persons.find(per => per.name === person.name)) {
        return response.status(400).json({
            error: 'name must be unique'
        })
    }
    person.id = Math.floor(Math.random() * 10000000);
    persons = [...persons, person]
    response.json(persons)
})



const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
import React, { useState, useEffect } from 'react'
import axios from 'axios'

import personService from './services/persons'


const Notification = ({ text }) => <p className='Notification'>{text}</p>
const PersonForm = (props) => (
  <>
    <form onSubmit={props.addNumber}>
      <div>
        name: <input value={props.newName} onChange={props.handleNoteChange} />
      </div>
      <div>
        number: <input value={props.newNumber} onChange={props.handleNumberChange} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  </>
)

const Persons = (props) => {
  return props.persons.filter(function (person) {
    if (person.name.includes(props.find)) {
      return person
    }
  }).map((person) => {
    return (
      <li key={person.id}>{person.name}: {person.number}<button onClick={() => {
        personService
          .remove(person.id)
          .then(
            console.log("success")
          )
          .catch(error => {
            console.log("fail")
            props.setAddText("Information about this person is already deleted")
          })
      }}>Delete</button></li>
    )
  })
}

const App = () => {


  const [persons, setPersons] = useState([])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [find, setFind] = useState('')
  const [addText, setAddText] = useState('Add new contacts!')

  useEffect(() => {
    personService
      .getAll()
      .then(response => {
        setPersons(response.data)
      })
  }, [personService.delete])
  const handleNoteChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFindChange = (event) => {
    setFind(event.target.value)
  }

  const addNumber = (event) => {
    event.preventDefault()

    var nameTest = persons.filter(function (person) {
      return person.name === newName
    })

    if (nameTest.length === 0) {
      const newPerson = { name: newName, number: newNumber, id: persons.lenght + 1 }
      setPersons([...persons, newPerson])
      setNewName('')
      setNewNumber('')

      personService
        .create(newPerson)
        .then(
          setAddText(newPerson.name + ' is added')
        )
    } else {
      if (window.confirm("Number with this name already exists, do you want to replace it?")) {
        personService
          .update(nameTest[0].id, { name: newName, number: newNumber })
      }
    }
  }


  const Filter = (props) => (
    <>
      filter shown with <input value={props.find} onChange={props.handleFindChange} />
    </>
  )

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification text={addText} />
      {Filter({ find: find, handleFindChange: handleFindChange })}
      <h2>Add a new</h2>
      <PersonForm addNumber={addNumber} newName={newName} newNumber={newNumber} handleNumberChange={handleNumberChange} handleNoteChange={handleNoteChange} />
      <h2>Numbers</h2>
      <ul>
        <Persons persons={persons} find={find} />
      </ul>
    </div>
  )
}

export default App
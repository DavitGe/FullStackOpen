import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { initialState } from './reducers/anecdoteReducer'

import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Notification from './components/Notification'

import anecdoteService from './services/anecdoteService'

const App = () => {

    const dispatch = useDispatch()
    useEffect(() => {
        anecdoteService.getAll()
            .then(res => dispatch(initialState({ data: res })))
    }, [dispatch])

    const [anecdoteInp, setAnecdoteInp] = useState('')
    const anecdotes = useSelector(state => state.anecdotes)
    return (
        <div>
            <AnecdoteList anecdotes={anecdotes} />
            <AnecdoteForm anecdoteInp={anecdoteInp} setAnecdoteInp={setAnecdoteInp} />
            <Notification />
        </div>
    )
}



export default App
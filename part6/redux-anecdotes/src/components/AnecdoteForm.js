import React from 'react'
import { connect } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'


const AnecdoteForm = (props) => {
    return (
        <>
            <h2>create new</h2>
            <form onSubmit={(e) => {
                e.preventDefault()
                props.createAnecdote({ anecdote: props.anecdoteInp })
            }}>
                <div><input name='anecdote' value={props.anecdoteInp} onChange={e => props.setAnecdoteInp(e.target.value)} /></div>
                <button type='submit'>create</button>
            </form>
        </>
    )
}

export default connect(
    null,
    { createAnecdote }
)(AnecdoteForm)

import React from 'react'
import { connect } from 'react-redux'
import Filter from './Filter'

import { vote } from '../reducers/anecdoteReducer'

const AnecdoteList = (props) => (
    <>
        <h2>Anecdotes</h2>
        <Filter />
        {props.anecdotes.map(anecdote => {
            if (anecdote.display) {
                return (<div key={anecdote.id}>
                    <div>
                        {anecdote.content}
                    </div>
                    <div>
                        has {anecdote.votes}
                        <button onClick={() => props.vote({ id: anecdote.id })}>vote</button>
                    </div>
                </div>)
            } else {
                return (<>
                </>)
            }
        }
        )}
    </>
)

const mapDispatchToProps = {
    vote,
}

const ConnectedAnecdotes = connect(
    null,
    mapDispatchToProps
)(AnecdoteList)

export default ConnectedAnecdotes

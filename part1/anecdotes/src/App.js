import React, { useState } from 'react'

function mostVotes(allVotes) {
  let temp = 0
  let best = 0
  allVotes.map((el, index) => {
    if (el >= temp) {
      temp = el
      best = index
    }
  })
  return best
}

function getRandomInt(max) {
  var rand = Math.floor(Math.random() * max)
  if (rand >= 0) {
    return rand
  } else {
    getRandomInt()
  }
}

const Anecdote = ({ anecdote, vote }) => <p>{anecdote}<br />has {vote} votes</p>

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
  ]

  const [allVotes, setAllVotes] = useState(Array(6).fill(0))
  const [selected, setSelected] = useState(0)

  const handleClick = () => {
    const tempVotes = [...allVotes]
    tempVotes[selected] += 1
    setAllVotes(tempVotes)
  }
  return (
    <div>
      <h1>Anecdote of the day:</h1>
      <Anecdote anecdote={anecdotes[selected]} vote={allVotes[selected]} />
      <button onClick={handleClick}>Vote</button>
      <button onClick={() => setSelected(getRandomInt(6))}>Next anecdote</button>
      <h1>Anecdote with the most votes: </h1>
      <Anecdote anecdote={anecdotes[mostVotes(allVotes)]} vote={allVotes[mostVotes(allVotes)]} />
      <button onClick={mostVotes}>test</button>
    </div>
  )
}

export default App
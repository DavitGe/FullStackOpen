import React, { useState } from 'react'

const StatisticLine = ({ text, value }) => {
  if (text == "Possitive") {
    return (
      <tr>
        <td>{text}</td>
        <td>{value}%</td>
      </tr>)
  } else {
    return (
      <tr>
        <td>{text}</td>
        <td>{value}</td>
      </tr>
    )
  }
}
const Statistic = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  if (good + neutral + bad !== 0) {
    return (
      <>
        <h1>Give Feedback</h1>
        <div>
          <button onClick={() => setGood(good + 1)}>Good</button>
          <button onClick={() => setNeutral(neutral + 1)}>Neutral</button>
          <button onClick={() => setBad(bad + 1)}>Bad</button>
        </div>
        <h2>Statistics</h2>
        <div>
          <StatisticLine text="Good" value={good} />
          <StatisticLine text="Neutral" value={neutral} />
          <StatisticLine text="Bad" value={bad} />
          <StatisticLine text="All" value={good + neutral + bad} />
          <StatisticLine text="Avarage" value={good - bad} />
          <StatisticLine text="Possitive" value={good / (good + neutral + bad) * 100} />
        </div>
      </>
    )
  } else {
    return (
      <>
        <h1>Give Feedback</h1>
        <div>
          <button onClick={() => setGood(good + 1)}>Good</button>
          <button onClick={() => setNeutral(neutral + 1)}>Neutral</button>
          <button onClick={() => setBad(bad + 1)}>Bad</button>
        </div>
        <h2>Statistics</h2>
        <p>No feedback given</p>
      </>
    )
  }
}

const App = () => {
  // save clicks of each button to its own state

  return (
    <Statistic />
  )
}

export default App
import React from 'react'

const Header = ({ name }) => <h1>{name}</h1>
const Part = ({ name, exercises }) => <p>{name} {exercises}</p>
const Content = ({ parts }) =>
  parts.map((part, i) => (
    <Part key={i} name={part.name} exercises={part.exercises} />
  ))
const Total = ({ exercises }) => <h4>Total of {exercises} exercises</h4>

const Course = ({ course }) => {

  var exerciseAmount = course.parts.reduce(function (sum, part) {
    return sum + part.exercises
  }, 0)

  return (
    <>
      <Header name={course.name} />
      <Content parts={course.parts} />
      <Total exercises={exerciseAmount} />
    </>
  )
}

const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    },
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  return (
    <>
      {courses.map(course => {
        return <Course key={course.id} course={course} />
      })}
    </>
  )
}

export default App
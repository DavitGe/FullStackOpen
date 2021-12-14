import React from 'react'

const Header = ({ name }) => <h1>{name}</h1>
const Part = ({ name, exercises }) => <p>{name} {exercises}</p>
const Content = ({ parts }) =>
  parts.map((part, i) => (
    <Part key={i} name={part.name} exercises={part.exercises} />
  ))
const Total = ({ exercises }) => <p>Total number: {exercises}</p>

const App = () => {
  const course = {
    name: "Half Stack application development",
    parts: [
      {
        name: "Fundamentals of React",
        exercises: 10,
      },
      {
        name: "Using props to pass data",
        exercises: 7,
      },
      {
        name: "State of a component",
        exercises: 14,
      },
    ],
  };
  const total = course.parts.reduce((total, part) => total + part.exercises, 0);
  return (
    <>
      <Header name={course.name} />
      <Content parts={course.parts} />
      <Total exercises={total} />
    </>
  );
};

export default App
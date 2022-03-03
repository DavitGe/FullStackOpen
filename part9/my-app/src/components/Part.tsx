import React from "react";
import { CoursePart } from "../types";

const Part = ({ course }: { course: CoursePart }) => {
  switch (course.type) {
    case "normal":
      return (
        <>
          <h3>{course.name}</h3>
          <p>{course.exerciseCount} exercises</p>
          {course.description ? <p>{course.description}</p> : null}
          <br />
        </>
      );
    case "groupProject":
      return (
        <>
          <h3>{course.name}</h3>
          <p>{course.exerciseCount} exercises</p>
          <p>Group Project Count: {course.groupProjectCount}</p>
          <br />
        </>
      );
    case "submission":
      return (
        <>
          <h3>{course.name}</h3>
          <p>{course.exerciseCount} exercises</p>
          {course.description ? <p>{course.description}</p> : null}
          <p>submision: {course.exerciseSubmissionLink}</p>
          <br />
        </>
      );
    case "special":
      return (
        <>
          <h3>{course.name}</h3>
          <p>{course.exerciseCount} exercises</p>
          {course.description ? <p>{course.description}</p> : null}
          <h4>Requirements:</h4>
          <ul>
            {course.requirements.map((x) => (
              <li>{x}</li>
            ))}
          </ul>
          <br />
        </>
      );
    default:
      return (
        <>
          <p>Not Found</p>
        </>
      );
  }
};

export default Part;

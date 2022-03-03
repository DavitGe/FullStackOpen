import React from "react";

const Component = ({
  courseExerciseCount,
}: {
  courseExerciseCount: number;
}) => {
  return (
    <>
      <h2>Number of exercises {courseExerciseCount}</h2>
    </>
  );
};

export default Component;

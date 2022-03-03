import React from "react";
import Part from "./Part";

import { CoursePart } from "../types";

const Content = ({ courseParts }: { courseParts: CoursePart[] }) => {
  return (
    <>
      {courseParts.map((course) => {
        return <Part course={course} />;
      })}
    </>
  );
};

export default Content;

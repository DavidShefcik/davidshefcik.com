import React, { ReactElement } from "react";

import ProjectContainerProps from "../../../../../types/ProjectContainerProps";

import Project from "../Project";

export default function Carousel({
  projects,
}: ProjectContainerProps): ReactElement {
  return (
    <div className="w-full flex flex-row flex-wrap justify-center items-center">
      <p>Car</p>
    </div>
  );
}

import React, { ReactElement } from "react";

import ProjectContainerProps from "../../../../../types/ProjectContainerProps";

import Project from "../Project";

import ProjectType from "../../../../../types/Project";

export default function Table({
  projects,
}: ProjectContainerProps): ReactElement {
  return (
    <div className="w-full flex flex-row flex-wrap justify-center items-center">
      {projects.map((project: ProjectType) => (
        <Project key={project.id} project={project} />
      ))}
    </div>
  );
}

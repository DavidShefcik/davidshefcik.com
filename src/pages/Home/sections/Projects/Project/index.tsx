import React, { ReactElement } from "react";

import Project from "../../../../../types/Project";

interface Props {
  project: Project;
}

export default function Project({ ...project }: Props): ReactElement {
  return (
    <div>
      <p>Project</p>
    </div>
  );
}

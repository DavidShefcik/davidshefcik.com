import React, { ReactElement } from "react";

import ProjectType from "../../../../../types/Project";

import LinkButton from "../../../../../components/LinkButton";

interface Props {
  project: ProjectType;
}

export default function Project({ project }: Props): ReactElement {
  const {
    id,
    name,
    description,
    openSource,
    githubLink,
    live,
    liveLink,
    tech,
  } = project;

  let techUsedString = "";
  let counter = 0;
  tech.forEach((item: string) => {
    if (counter === tech.length - 1) {
      techUsedString += `and ${item}`;
    } else if (tech.length !== 2) {
      techUsedString += `${item}, `;
    } else {
      techUsedString += `${item} `;
    }
    counter += 1;
  });

  return (
    <div className="bg-secondary-background shadow-sm m-2 project-box flex flex-col justify-start items-center overflow-auto">
      <div className="w-full flex flex-col justify-start items-center flex-grow">
        <p className="pb-2 pt-4 text-lg text-white w-full text-center border-solid border-b border-gray-200">
          {name}
        </p>
        <p className="text-gray-400 p-2 text-center">{description}</p>
        <p className="w-full text-center text-lg text-white py-1 px-2">
          Technology Used
        </p>
        <p className="w-full text-center px-2 text-gray-400">
          {techUsedString}
        </p>
      </div>
      {openSource === "true" || live === "true" ? (
        <div
          className={`w-full px-4 py-2 bg-darker-primary-background flex flex-col lg:flex-row ${
            openSource === "true" && live === "true"
              ? "justify-between"
              : "justify-center"
          } items-center`}
        >
          {githubLink !== "" ? (
            <LinkButton
              text="GitHub"
              backgroundColor="bg-gray-600"
              hoverBackgroundColor="bg-gray-700"
              url={githubLink}
            />
          ) : null}
          {liveLink !== "" ? (
            <LinkButton
              text="Live"
              backgroundColor="bg-blue-600"
              hoverBackgroundColor="bg-blue-700"
              url={liveLink}
            />
          ) : null}
        </div>
      ) : null}
    </div>
  );
}

import React, { ReactElement } from "react";

import SkillType from "../../../../../types/Skill";

interface Props {
  skill: SkillType;
  even: boolean;
}

export default function Skill({ skill, even }: Props): ReactElement {
  const { name } = skill;

  return (
    <div
      className={`w-full px-1 py-2 flex flex-row justify-center items-center ${
        even ? "bg-darker-primary-background" : ""
      }`}
    >
      <p className="text-gray-100 text-center">{name}</p>
    </div>
  );
}

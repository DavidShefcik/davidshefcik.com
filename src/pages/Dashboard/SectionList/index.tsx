import React, { ReactElement, Dispatch, SetStateAction } from "react";

import SectionButton from "../../../components/SectionButton";

import SectionButtonType from "../../../types/SectionButton";
import sectionButtons from "../../../values/sectionButtons";

interface Props {
  currentSection: string;
  click: Dispatch<SetStateAction<string>>;
}

export default function SectionList({
  currentSection,
  click,
}: Props): ReactElement {
  function logout(): void {
    console.log("Logout");
  }

  return (
    <div className="w-full flex flex-col items-center">
      {sectionButtons.map((button: SectionButtonType) => {
        return (
          <SectionButton
            text={button.text}
            click={() => click(button.sectionName)}
            current={currentSection === button.sectionName}
            key={button.text}
          />
        );
      })}
      <SectionButton text="Logout" click={logout} current={false} />
    </div>
  );
}

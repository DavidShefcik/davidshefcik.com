import React, { ReactElement } from "react";

interface Props {
  text: string;
  current: boolean;
  click: any;
}

export default function SectionButton({
  text,
  current,
  click,
}: Props): ReactElement {
  return (
    <button
      type="button"
      title={text}
      onClick={() => click()}
      className={`focus:outline-none w-full mx-2 my-1 py-2 bg-primary-background cursor-pointer transition ease-in duration-75 ${
        current ? "bg-darker-primary-background" : ""
      }`}
    >
      <p className="text-white">{text}</p>
    </button>
  );
}

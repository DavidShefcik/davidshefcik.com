import React, { ReactElement } from "react";

interface Props {
  text: string;
  backgroundColor: string;
  hoverBackgroundColor: string;
  url: any;
}

export default function LinkButton({
  text,
  backgroundColor,
  hoverBackgroundColor,
  url,
}: Props): ReactElement {
  return (
    <div
      className={`w-1/2 lg:w-2/4 xl:w-1/4 flex flex-row justify-center items-center mx-3 my-3 lg:my-0 px-3 py-2 cursor-pointer transition ease-in duration-75 rounded-sm ${backgroundColor} hover:${hoverBackgroundColor}`}
      title={text}
      onClick={() => window.open(url, "_blank")}
    >
      <p className="text-gray-100">{text}</p>
    </div>
  );
}

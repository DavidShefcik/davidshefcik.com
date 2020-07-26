import React, { ReactElement, ReactChild } from "react";

interface Props {
  title: string;
  children: ReactChild;
}

export default function HomeTitle({ title, children }: Props): ReactElement {
  return (
    <div className="growable-home-section w-full flex flex-col justify-center items-center py-6 px-10">
      <p className="text-white text-2xl pb-6">{title}</p>
      {children}
    </div>
  );
}

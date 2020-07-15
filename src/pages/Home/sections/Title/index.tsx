import React, { ReactElement } from "react";

import "./css/Title.css";

export default function Title(): ReactElement {
  return (
    <div className="fixed-home-section relative">
      <div className="title-image-container w-full h-full absolute">
        <div className="title-image" />
      </div>
      <div className="absolute bg-white w-3/4 lg:w-2/4 z-40 py-4 flex items-center justify-center title-box shadow">
        <p className="text-xl text-center">Full Stack JavaScript Developer</p>
      </div>
    </div>
  );
}

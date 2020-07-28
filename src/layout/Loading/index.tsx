import React, { ReactElement } from "react";
import { PulseLoader } from "react-spinners";

export default function Loading(): ReactElement {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <PulseLoader color="white" size={8} />
    </div>
  );
}

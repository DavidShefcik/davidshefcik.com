import React, { ReactElement } from "react";

import "./css/tailwind.css";

import Navigation from "./Navigation";

export default function App(): ReactElement {
  return (
    <div className="bg-main-background w-screen h-screen">
      <Navigation />
    </div>
  );
}

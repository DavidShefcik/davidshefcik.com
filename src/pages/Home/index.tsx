import React, { ReactElement } from "react";

import Title from "./sections/Title";
import About from "./sections/About";
import Projects from "./sections/Projects";
import Skills from "./sections/Skills";
import Contact from "./sections/Contact";

export default function Home(): ReactElement {
  return (
    <>
      <Title />
      <About />
    </>
  );
}

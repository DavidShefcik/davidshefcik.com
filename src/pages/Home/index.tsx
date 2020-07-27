import React, { ReactElement } from "react";

import Title from "./sections/Title";
import About from "./sections/About";
import Projects from "./sections/Projects";
import Skills from "./sections/Skills";
import Contact from "./sections/Contact";

export default function Home(): ReactElement {
  return (
    <>
      <div id="home" />
      <Title />
      <div id="about" />
      <About />
      <div id="projects" />
      <Projects />
      <div id="skills" />
      <Skills />
      <div id="contact" />
      <Contact />
    </>
  );
}

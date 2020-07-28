import React, { ReactElement, Suspense, lazy } from "react";

import Loading from "../../layout/Loading";

const Title = lazy(() => import("./sections/Title"));
const About = lazy(() => import("./sections/About"));
const Projects = lazy(() => import("./sections/Projects"));
const Skills = lazy(() => import("./sections/Skills"));
const Contact = lazy(() => import("./sections/Contact"));

export default function Home(): ReactElement {
  return (
    <Suspense fallback={<Loading />}>
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
    </Suspense>
  );
}

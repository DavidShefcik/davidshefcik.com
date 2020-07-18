/* eslint no-nested-ternary: "off" */

import React, { ReactElement, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

import SectionList from "./SectionList";

import About from "./sections/About";
import Projects from "./sections/Projects";
import Skills from "./sections/Skills";
import Contact from "./sections/Contact";

import useSession from "../../store/Session";

export default function Dashboard(): ReactElement {
  const loggedIn = useSession((state) => state.session.loggedIn);

  const [currentSection, setCurrentSection] = useState("about");

  const history = useHistory();

  // useEffect(() => {
  //   if (!loggedIn) {
  //     history.push("/");
  //   }
  // }, [loggedIn]);

  return (
    <div className="page-contents-height w-full flex flex-col lg:flex-row justify-center items-center py-10">
      <div className="w-11/12 lg:w-1/4 flex h-auto lg:h-full justify-center items-start bg-secondary-background rounded-sm px-2 py-4 ms-4 my-2 lg:my-6">
        <SectionList
          currentSection={currentSection}
          click={setCurrentSection}
        />
      </div>
      <div className="w-11/12 lg:w-2/4 h-full flex justify-center items-start bg-secondary-background rounded-sm px-2 py-4 mx-4 my-2 lg:my-6">
        {currentSection === "about" ? (
          <About />
        ) : currentSection === "projects" ? (
          <Projects />
        ) : currentSection === "skills" ? (
          <Skills />
        ) : (
          <Contact />
        )}
      </div>
    </div>
  );
}

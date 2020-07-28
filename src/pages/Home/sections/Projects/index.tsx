import React, { ReactElement, useEffect, useState } from "react";

import ProjectType from "../../../../types/Project";

import HomeSection from "../../../../components/HomeSection";

import Table from "./Table";

import useFirebase from "../../../../store/Firebase";

import useProjects from "../../../../store/home/Projects";

export default function Projects(): ReactElement {
  const projectList = useProjects((state) => state.projects);
  const setProjectList = useProjects((state) => state.setProjects);

  const firebase = useFirebase((state) => state.firebase);

  const [projects, setProjects] = useState<Array<ProjectType>>([]);
  const [status, setStatus] = useState("loading");

  const db = firebase.firestore();

  async function getProjects(): Promise<boolean> {
    try {
      const projectsFromDB: Array<ProjectType> = [];

      const projectsList = await db.collection("projects").get();
      projectsList.docs.forEach((doc: any) => {
        const project = doc.data();
        project.id = doc.id;
        projectsFromDB.push(project);
      });
      setProjects(projectsFromDB);
      setStatus("success");
    } catch (error) {
      if (process.env.NODE_ENV === "dev") {
        console.log(error);
      }
      setStatus("error");
    }

    return true;
  }

  useEffect(() => {
    if (projectList === null) {
      getProjects();
    } else {
      setProjects(projectList);
      setStatus("success");
    }
  }, []);

  useEffect(() => {
    setProjectList(projects);
  }, [projects]);

  return (
    <HomeSection title="Projects" status={status} growable>
      <Table projects={projects} />
    </HomeSection>
  );
}

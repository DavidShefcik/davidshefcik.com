import React, { ReactElement, useEffect, useState } from "react";
import { MdViewCarousel, MdViewModule } from "react-icons/md";
import "firebase/firestore";

import ProjectType from "../../../../types/Project";

import HomeSection from "../../../../components/HomeSection";

import Carousel from "./Carousel";
import Table from "./Table";

import useFirebase from "../../../../store/Firebase";

import useProjects from "../../../../store/home/Projects";

import useProjectsViewType, {
  ProjectsViewTypes,
} from "../../../../store/home/ProjectsViewType";

export default function Projects(): ReactElement {
  const projectList = useProjects((state) => state.projects);
  const setProjectList = useProjects((state) => state.setProjects);

  const projectsViewType = useProjectsViewType((state) => state.type);
  const setProjectsViewType = useProjectsViewType((state) => state.setType);

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
    }
  }, []);

  useEffect(() => {
    setProjectList(projects);
  }, [projects]);

  useEffect(() => {
    const localStorageViewType = localStorage.getItem("projectviewtype");
    if (localStorageViewType != null) {
      setProjectsViewType(localStorageViewType);
    }
  }, [setProjectsViewType]);

  return (
    <HomeSection title="Projects" status={status}>
      <>
        <div className="w-full lg:w-2/3 pb-6 lg:pb-0 flex flex-row items-center justify-center lg:justify-end">
          <MdViewCarousel
            size={38}
            className={`${
              projectsViewType === ProjectsViewTypes.CAROUSEL
                ? "text-gray-200"
                : "text-gray-600 hover:text-gray-400"
            } cursor-pointer transition ease-in duration-75 mx-2 transition ease-in duration-75`}
            title="Carousel"
            onClick={() => setProjectsViewType(ProjectsViewTypes.CAROUSEL)}
          />
          <MdViewModule
            size={38}
            className={`${
              projectsViewType === ProjectsViewTypes.TABLE
                ? "text-gray-200"
                : "text-gray-600 hover:text-gray-400"
            } cursor-pointer transition ease-in duration-75 mx-2 transition ease-in duration-75`}
            title="Carousel"
            onClick={() => setProjectsViewType(ProjectsViewTypes.TABLE)}
          />
        </div>
        {projectsViewType === ProjectsViewTypes.CAROUSEL ? (
          <Carousel projects={projects} />
        ) : (
          <Table projects={projects} />
        )}
      </>
    </HomeSection>
  );
}

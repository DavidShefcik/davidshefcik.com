import React, { ReactElement, useState, useEffect } from "react";
import { BarLoader } from "react-spinners";
import "firebase/firestore";

import DashboardItemList from "../../../../components/DashboardItemList";

import AddProject from "./AddProject";
import Project from "./Project";

import ProjectType from "../../../../types/Project";

import useFirebase from "../../../../store/Firebase";

export default function Projects(): ReactElement {
  const [status, setStatus] = useState("loading");
  const [projects, setProjects] = useState<Array<ProjectType>>([]);

  const firebase = useFirebase((state) => state.firebase);

  const db = firebase.firestore();

  useEffect(() => {
    const projectsFromDB = [];
    setStatus("success");
  }, []);

  return (
    <div className="flex w-full h-full flex-col items-center py-4">
      {status === "loading" ? (
        <BarLoader color="white" width={152} />
      ) : status === "error" ? (
        <p className="py-2 text-red-600">
          Something happened! Please try again!
        </p>
      ) : (
        <DashboardItemList
          items={projects}
          addItem={AddProject}
          listItem={Project}
        />
      )}
    </div>
  );
}

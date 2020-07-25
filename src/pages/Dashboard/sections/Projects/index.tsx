import React, { ReactElement, useState, useEffect } from "react";
import { BarLoader } from "react-spinners";
import { MdRefresh } from "react-icons/md";
import "firebase/firestore";

import DashboardItemList from "../../../../components/DashboardItemList";

import AddProject from "./AddProject";
import Project from "./Project";

import ConfirmModal from "../../../../layout/Modals/ConfirmModal";

import ProjectType from "../../../../types/Project";

import useFirebase from "../../../../store/Firebase";

import useProjectList from "../../../../store/dashboard/Projects/ProjectList";

import useAddProject from "../../../../store/dashboard/Projects/AddProject";

import useDeleteProjectModal from "../../../../store/modals/DeleteProjectModal";

import useSession from "../../../../store/Session";

export default function Projects(): ReactElement {
  const projectList = useProjectList((state) => state.projects);
  const setProjectList = useProjectList((state) => state.setProjects);

  const addProjectVisible = useAddProject((state) => state.visible);
  const setAddProjectVisible = useAddProject((state) => state.setVisible);

  const loggedIn = useSession((state) => state.session.loggedIn);

  const [status, setStatus] = useState("loading");
  const [projects, setProjects] = useState<Array<ProjectType>>(projectList);

  const [deleteLoading, setDeleteLoading] = useState(false);

  const deleteProjectModalVisible = useDeleteProjectModal(
    (state) => state.visible
  );
  const setDeleteProjectModalVisible = useDeleteProjectModal(
    (state) => state.setVisible
  );
  const deleteProjectInfo = useDeleteProjectModal((state) => state.projectInfo);

  const firebase = useFirebase((state) => state.firebase);

  const db = firebase.firestore();

  async function getProjects() {
    const projectsFromDB: Array<ProjectType> = [];

    try {
      const projectsList = await db.collection("projects").get();
      projectsList.docs.forEach((doc: any) => {
        const project = doc.data();
        project.id = doc.id;
        projectsFromDB.push(project);
      });
      setStatus("success");
      setProjects(projectsFromDB);
    } catch (error) {
      if (process.env.NODE_ENV === "dev") {
        console.log(error);
      }
      setStatus("error");
    }
  }

  function deleteProject(): void {
    setDeleteLoading(true);

    if (deleteProjectInfo.projectID !== "") {
      db.collection("projects")
        .doc(deleteProjectInfo.projectID)
        .delete()
        .then(() => {
          setDeleteProjectModalVisible(false);
          getProjects();
        })
        .catch((error: any) => {
          if (process.env.NODE_ENV === "dev") {
            console.log(error);
          }
        });
    }

    setDeleteLoading(false);
  }

  useEffect(() => {
    if (loggedIn && projectList === null) {
      getProjects();
    } else if (loggedIn && projectList !== null) {
      setStatus("success");
      setProjects(projectList);
    }
  }, [loggedIn]);

  useEffect(() => {
    setProjectList(projects);
  }, [projects]);

  return (
    <>
      <ConfirmModal
        title="Delete Project?"
        text={`Are you sure you want to delete project "${deleteProjectInfo.projectName}"?`}
        isVisible={deleteProjectModalVisible}
        closeModal={() => {
          setDeleteLoading(false);
          setDeleteProjectModalVisible(false);
        }}
        onConfirm={() => deleteProject()}
        loading={deleteLoading}
      />
      <div className="flex w-full h-full flex-col items-center py-4">
        {status !== "loading" ? (
          <div className="w-full flex items-center justify-end">
            <MdRefresh
              size={24}
              className="text-gray-200 hover:text-gray-400 m-3 mt-0 cursor-pointer transition ease-in duration-75"
              title="Reload"
              onClick={() => getProjects()}
            />
          </div>
        ) : null}
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
            showAddItem={addProjectVisible}
            setShowAddItem={setAddProjectVisible}
          />
        )}
      </div>
    </>
  );
}

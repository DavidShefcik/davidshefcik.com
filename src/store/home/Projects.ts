/* Creating a seperate store instead of reusing the dashboard store to keep them in seperate places in memory */

import create, { SetState } from "zustand";

import Project from "../../types/Project";

interface ProjectListState {
  projects: Array<Project> | null;
  setProjects: any;
  addProject: any;
  removeProject: any;
}

const [useStore] = create((set: SetState<ProjectListState>) => ({
  projects: null,
  setProjects: (projects: Array<Project>) =>
    set(() => ({
      projects,
    })),
  addProject: (project: Project) =>
    set((state) => ({
      projects: state.projects.concat(project),
    })),
  removeProject: (project: Project) =>
    set((state) => ({
      projects: state.projects.filter(
        (item: Project) => item.id !== project.id
      ),
    })),
}));

export default useStore;

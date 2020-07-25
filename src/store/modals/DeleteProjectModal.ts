import create, { SetState } from "zustand";

interface ProjectInfo {
  projectID: string;
  projectName: string;
}

interface DeleteProjectModalState {
  visible: boolean;
  projectInfo: ProjectInfo;
  setProject: any;
  clearProject: any;
  setVisible: any;
}

const [useStore] = create((set: SetState<DeleteProjectModalState>) => ({
  visible: false,
  projectInfo: {
    projectID: "",
    projectName: "",
  },
  setProject: (projectID: string, projectName: string) =>
    set(() => ({
      projectInfo: {
        projectID,
        projectName,
      },
    })),
  clearProject: () =>
    set(() => ({
      projectInfo: {
        projectID: "",
        projectName: "",
      },
    })),
  setVisible: (visible: boolean) =>
    set(() => ({
      visible,
    })),
}));

export default useStore;

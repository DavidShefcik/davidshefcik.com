import create, { SetState, GetState } from "zustand";

import Project from "../../../types/Project";

interface AddProjectState {
  visible: boolean;
  values: Project;
  setValue: any;
  clearValues: any;
  setVisible: any;
}

const [useStore] = create(
  (set: SetState<AddProjectState>, get: GetState<AddProjectState>) => ({
    visible: false,
    values: {
      id: "",
      name: "",
      description: "",
      openSource: "none",
      github: "",
      live: "none",
      liveLink: "",
      tech: "",
    },
    setValue: (key: string, value: string) => {
      const newObject = get().values;
      newObject[key] = value;
      set(() => ({
        values: newObject,
      }));
    },
    clearValues: () =>
      set(() => ({
        values: {
          name: "",
          description: "",
          openSource: "none",
          github: "",
          live: "none",
          liveLink: "",
          tech: "",
        },
      })),
    setVisible: (visible: boolean) =>
      set(() => ({
        visible,
      })),
  })
);

export default useStore;

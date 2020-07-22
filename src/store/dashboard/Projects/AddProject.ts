import create, { SetState, GetState } from "zustand";

import Project from "../../../types/Project";

interface AddProjectState {
  values: Project;
  setValue: any;
}

const [useStore] = create(
  (set: SetState<AddProjectState>, get: GetState<AddProjectState>) => ({
    values: {
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
  })
);

export default useStore;

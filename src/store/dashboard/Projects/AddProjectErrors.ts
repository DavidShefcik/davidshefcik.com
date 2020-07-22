import create, { SetState, GetState } from "zustand";

interface Errors {
  name: boolean;
  description: boolean;
  openSource: boolean;
  github: boolean;
  live: boolean;
  liveLink: boolean;
  tech: boolean;
  text: string;
  [key: string]: any;
}

interface AddProjectErrorsState {
  values: Errors;
  setValue: any;
}

const [useStore] = create(
  (
    set: SetState<AddProjectErrorsState>,
    get: GetState<AddProjectErrorsState>
  ) => ({
    values: {
      name: false,
      description: false,
      openSource: false,
      github: false,
      live: false,
      liveLink: false,
      tech: false,
      text: "",
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

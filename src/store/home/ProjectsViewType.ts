import create, { SetState, GetState } from "zustand";

enum ProjectsViewTypes {
  CAROUSEL = "CAROUSEL",
  TABLE = "TABLE",
}
interface ViewTypeState {
  type: ProjectsViewTypes;
  setType: any;
}

const localStorageMiddleware = (config: any) => (
  set: SetState<ViewTypeState>,
  get: GetState<ViewTypeState>,
  api: any
) =>
  config(
    (args: any) => {
      set(args);
      localStorage.setItem("projectviewtype", get().type);
    },
    get,
    api
  );

const [useStore] = create(
  localStorageMiddleware((set: SetState<ViewTypeState>) => ({
    type: ProjectsViewTypes.CAROUSEL,
    setType: (type: ProjectsViewTypes) =>
      set(() => ({
        type,
      })),
  }))
);

export default useStore;
export { ProjectsViewTypes };

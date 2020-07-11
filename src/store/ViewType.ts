import create, { SetState, GetState } from "zustand";

enum ViewTypes {
  TERMINAL = "TERMINAL",
  GUI = "GUI",
}
interface ViewTypeState {
  type: ViewTypes;
  setType?: any;
}

const localStorageMiddleware = (config: any) => (
  set: SetState<ViewTypeState>,
  get: GetState<ViewTypeState>,
  api: any
) =>
  config(
    (args: any) => {
      set(args);
      localStorage.setItem("viewtype", get().type);
    },
    get,
    api
  );

const [useStore] = create(
  localStorageMiddleware((set: SetState<ViewTypeState>) => ({
    type: ViewTypes.GUI,
    setType: (type: ViewTypes) =>
      set(() => ({
        type,
      })),
  }))
);

export default useStore;
export { ViewTypes };

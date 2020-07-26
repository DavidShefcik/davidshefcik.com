import create, { SetState } from "zustand";

interface ConfirmLogoutModalState {
  visible: boolean;
  setVisible: any;
}

const [useStore] = create((set: SetState<ConfirmLogoutModalState>) => ({
  visible: false,
  setVisible: (visible: boolean) =>
    set(() => ({
      visible,
    })),
}));

export default useStore;

import create, { SetState } from "zustand";

interface MobileMenuState {
  open: boolean;
  toggleOpen: any;
}

const [useStore] = create((set: SetState<MobileMenuState>) => ({
  open: false,
  toggleOpen: () =>
    set((state) => ({
      open: !state.open,
    })),
}));

export default useStore;

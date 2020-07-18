import create, { SetState } from "zustand";

interface AboutState {
  aboutText: string | null;
  setAboutText: any;
}

const [useStore] = create((set: SetState<AboutState>) => ({
  aboutText: null,
  setAboutText: (text: string) =>
    set(() => ({
      aboutText: text,
    })),
}));

export default useStore;

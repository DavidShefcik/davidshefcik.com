/* Creating a seperate store instead of reusing the dashboard store to keep them in seperate places in memory */

import create, { SetState } from "zustand";

interface HomeAboutState {
  aboutText: string | null;
  setAboutText: any;
}

const [useStore] = create((set: SetState<HomeAboutState>) => ({
  aboutText: null,
  setAboutText: (text: string) =>
    set(() => ({
      aboutText: text,
    })),
}));

export default useStore;

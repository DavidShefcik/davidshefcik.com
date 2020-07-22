import create, { SetState } from "zustand";
import { User } from "firebase";

interface Session {
  loggedIn: boolean | null;
  user: User | null;
}
interface SessionState {
  session: Session;
  setSession: any;
  clearSession: any;
  setNotLoggedIn: any;
  updateUser: any;
}

const [useStore] = create((set: SetState<SessionState>) => ({
  session: {
    loggedIn: null,
    user: null,
  },
  setSession: (user: User) =>
    set(() => ({
      session: {
        loggedIn: true,
        user,
      },
    })),
  setNotLoggedIn: () =>
    set((state: any) => ({
      session: {
        loggedIn: false,
        user: state.session.user,
      },
    })),
  clearSession: () =>
    set(() => ({
      session: {
        loggedIn: false,
        user: null,
      },
    })),
  updateUser: (user: User) =>
    set((state) => ({
      session: {
        user,
        loggedIn: state.session.loggedIn,
      },
    })),
}));

export default useStore;

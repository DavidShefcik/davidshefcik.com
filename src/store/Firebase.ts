import create, { SetState } from "zustand";
import firebase from "firebase";

interface FirebaseState {
  firebase: firebase.app.App | null;
  createFirebase: any;
}

const [useStore] = create((set: SetState<FirebaseState>) => ({
  firebase: null,
  createFirebase: (firebaseApp: any) =>
    set(() => ({
      firebase: firebaseApp,
    })),
}));

export default useStore;

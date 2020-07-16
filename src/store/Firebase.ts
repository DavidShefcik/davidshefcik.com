import create, { SetState } from "zustand";
import firebase from "firebase";

interface FirebaseState {
  firebase: firebase.app.App | null;
  provider: firebase.auth.AuthProvider | null;
  createFirebase: any;
}

const [useStore] = create((set: SetState<FirebaseState>) => ({
  firebase: null,
  provider: null,
  createFirebase: (firebaseApp: any, providerInstance: any) =>
    set(() => ({
      firebase: firebaseApp,
      provider: providerInstance,
    })),
}));

export default useStore;

import React, { ReactElement, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import firebase, { User } from "firebase";
import app from "firebase/app";
import "firebase/auth";

import "./css/tailwind.css";

import Header from "../layout/Header";
import Terminal from "../layout/Terminal";
import Navigation from "./Navigation";
import ViewTypeSwitch from "../layout/ViewTypeSwitch";
import Footer from "../layout/Footer";

import useViewType, { ViewTypes } from "../store/ViewType";

import useFirebase from "../store/Firebase";

import useSession from "../store/Session";

export default function App(): ReactElement {
  const viewType = useViewType((state) => state.type);
  const setViewType = useViewType((state) => state.setType);

  const setSession = useSession((state) => state.setSession);

  const createFirebase = useFirebase((state) => state.createFirebase);
  let config = {};

  if (process.env.NODE_ENV === "dev") {
    config = {
      apiKey: process.env.DEV_FIREBASE_API_KEY,
      authDomain: process.env.DEV_FIREBASE_AUTH_DOMAIN,
      databaseURL: process.env.DEV_FIREBASE_DATABASE_URL,
      projectId: process.env.DEV_FIREBASE_PROJECT_ID,
      storageBucket: process.env.DEV_FIREBASE_STORAGE_BUCKET,
      messagingSenderId: process.env.DEV_FIREBASE_MESSAGING_SENDER_ID,
    };
  } else {
    config = {
      apiKey: process.env.PROD_FIREBASE_API_KEY,
      authDomain: process.env.PROD_FIREBASE_AUTH_DOMAIN,
      databaseURL: process.env.PROD_FIREBASE_DATABASE_URL,
      projectId: process.env.PROD_FIREBASE_PROJECT_ID,
      storageBucket: process.env.PROD_FIREBASE_STORAGE_BUCKET,
      messagingSenderId: process.env.PROD_FIREBASE_MESSAGING_SENDER_ID,
    };
  }

  if (firebase.apps.length === 0) {
    const firebaseApp = app.initializeApp(config);
    const provider = new firebase.auth.GoogleAuthProvider();

    provider.addScope("https://www.googleapis.com/auth/userinfo.email");
    provider.addScope("https://www.googleapis.com/auth/userinfo.profile");

    createFirebase(firebaseApp, provider);

    firebaseApp.auth().onAuthStateChanged((user: User) => {
      if (user) {
        firebaseApp
          .firestore()
          .collection("users")
          .doc(user.uid)
          .get()
          .then((result: any) => {
            if (result) {
              const { admin } = result.data();
              if (admin) {
                setSession(user);
              } else {
                firebaseApp
                  .auth()
                  .signOut()
                  .then(() => {})
                  .catch((error) => {
                    if (process.env.NODE_ENV === "dev") {
                      console.log(error);
                    }
                  });
              }
            }
          })
          .catch((error) => {
            if (process.env.NODE_ENV === "dev") {
              console.log(error);
            }
          });
      }
    });
  }

  useEffect(() => {
    const localStorageViewType = localStorage.getItem("viewtype");
    if (localStorageViewType != null) {
      setViewType(localStorageViewType);
    }
  }, [setViewType]);

  return (
    <div className="bg-primary-background w-full h-full">
      <ViewTypeSwitch />
      <BrowserRouter>
        {viewType === ViewTypes.GUI ? (
          <>
            <Header />
            <div className="page-contents">
              <Navigation />
            </div>
            <Footer />
          </>
        ) : (
          <Terminal />
        )}
      </BrowserRouter>
    </div>
  );
}

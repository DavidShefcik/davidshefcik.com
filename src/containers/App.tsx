import React, { ReactElement, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import app from "firebase/app";

import "./css/tailwind.css";

import Header from "../layout/Header";
import Terminal from "../layout/Terminal";
import Navigation from "./Navigation";
import ViewTypeSwitch from "../layout/ViewTypeSwitch";
import Footer from "../layout/Footer";

import useViewType, { ViewTypes } from "../store/ViewType";
import useFirebase from "../store/Firebase";

export default function App(): ReactElement {
  const viewType = useViewType((state) => state.type);
  const setViewType = useViewType((state) => state.setType);

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

  const firebaseApp = app.initializeApp(config);

  createFirebase(firebaseApp);

  useEffect(() => {
    const localStorageViewType = localStorage.getItem("viewtype");
    if (localStorageViewType != null) {
      setViewType(localStorageViewType);
    }
  }, [setViewType]);

  return (
    <div className="bg-main-background w-full h-full">
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

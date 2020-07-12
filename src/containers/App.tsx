import React, { ReactElement, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";

import "./css/tailwind.css";

import Header from "../layout/Header";
import Terminal from "../layout/Terminal";
import Navigation from "./Navigation";
import Footer from "../layout/Footer";

import useViewType, { ViewTypes } from "../store/ViewType";

export default function App(): ReactElement {
  const viewType = useViewType((state) => state.type);
  const setViewType = useViewType((state) => state.setType);

  useEffect(() => {
    const localStorageViewType = localStorage.getItem("viewtype");
    if (localStorageViewType != null) {
      setViewType(localStorageViewType);
    }
  }, [setViewType]);

  return (
    <div className="bg-main-background w-full h-full">
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

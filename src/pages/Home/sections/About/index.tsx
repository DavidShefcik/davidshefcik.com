import React, { ReactElement, useState, useEffect } from "react";
import "firebase/firestore";

import useFirebase from "../../../../store/Firebase";

import useHomeAbout from "../../../../store/home/About";

import HomeSection from "../../../../components/HomeSection";

export default function About(): ReactElement {
  const firebase = useFirebase((state) => state.firebase);

  const homeAbout = useHomeAbout((state) => state.aboutText);
  const setHomeAbout = useHomeAbout((state) => state.setAboutText);

  const [status, setStatus] = useState("loading");

  useEffect(() => {
    const fetchAbout = async () => {
      const db = firebase.firestore();

      db.collection("info")
        .doc("about")
        .get()
        .then((doc) => {
          setStatus(doc.data().value);
        })
        .catch((error) => {
          if (process.env.NODE_ENV === "dev") {
            console.log(error);
          }
          setStatus("error");
        });
    };

    if (homeAbout === null) {
      fetchAbout();
    } else {
      setStatus(homeAbout);
    }
  }, []);

  useEffect(() => {
    if (status !== "error" && status !== "loading" && status !== homeAbout) {
      setHomeAbout(status);
    }
  }, [status]);

  return (
    <HomeSection title="About" status={status}>
      <p className="text-lg text-gray-300 text-center w-4/5 lg:w-2/4">
        {status}
      </p>
    </HomeSection>
  );
}

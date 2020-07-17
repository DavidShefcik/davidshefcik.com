/* eslint no-nested-ternary: "off" */

import React, { ReactElement, useState, useEffect } from "react";
import { BarLoader } from "react-spinners";
import "firebase/firestore";

import useFirebase from "../../../../store/Firebase";

export default function About(): ReactElement {
  const firebase = useFirebase((state) => state.firebase);

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

    fetchAbout();
  }, []);

  return (
    <div className="growable-home-section flex items-center flex-col py-6 px-10">
      <p className="text-white text-2xl pb-6">About</p>
      {status === "loading" ? (
        <BarLoader color="white" width={150} />
      ) : status === "error" ? (
        <p className="text-xl text-red-600">
          Something happened! Please try again!
        </p>
      ) : (
        <p className="text-lg text-gray-300 text-center">{status}</p>
      )}
    </div>
  );
}

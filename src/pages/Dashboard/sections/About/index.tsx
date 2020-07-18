/* eslint no-nested-ternary: "off" */

import React, { ReactElement, useState, useEffect } from "react";
import { BarLoader } from "react-spinners";
import "firebase/firestore";

import FormTextArea from "../../../../components/FormTextArea";
import FormButton from "../../../../components/FormButton";

import useFirebase from "../../../../store/Firebase";

import useAboutStore from "../../../../store/dashboard/About";

export default function About(): ReactElement {
  const [buttonLoading, setButtonLoading] = useState(false);
  const [status, setStatus] = useState("loading");
  const [updateStatus, setUpdateStatus] = useState("");
  const [aboutValue, setAboutValue] = useState("");
  const [textAreaValue, setTextAreaValue] = useState("");

  const firebase = useFirebase((state) => state.firebase);
  const aboutTextStore = useAboutStore((state) => state.aboutText);
  const setAboutTextStore = useAboutStore((state) => state.setAboutText);

  const db = firebase.firestore();

  function submit(): void {
    setUpdateStatus("");
    setButtonLoading(true);

    db.collection("info")
      .doc("about")
      .set({ value: textAreaValue })
      .then(() => {
        setButtonLoading(false);
        setUpdateStatus("success");
      })
      .catch((error) => {
        if (process.env.NODE_ENV === "dev") {
          console.log(error);
        }
        setUpdateStatus("error");
        setButtonLoading(false);
      });
  }

  async function fetchAbout(): Promise<boolean> {
    setStatus("loading");
    setButtonLoading(true);

    db.collection("info")
      .doc("about")
      .get()
      .then((doc) => {
        setStatus("success");
        setButtonLoading(false);
        setAboutValue(doc.data().value);
        setTextAreaValue(doc.data().value);
      })
      .catch((error) => {
        if (process.env.NODE_ENV === "dev") {
          console.log(error);
        }
        setButtonLoading(false);
        setStatus("error");
      });

    return true;
  }

  function click(): any {
    if (status === "error") {
      fetchAbout();
    } else {
      submit();
    }
  }

  useEffect(() => {
    if (aboutTextStore === null) {
      fetchAbout();
    } else {
      setStatus("success");
      setAboutValue(aboutTextStore);
      setTextAreaValue(aboutTextStore);
    }
  }, []);

  useEffect(() => {
    setAboutTextStore(textAreaValue);
  }, [textAreaValue]);

  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      {status === "loading" ? (
        <div className="py-4">
          <BarLoader color="white" width={152} />
        </div>
      ) : status === "error" ? (
        <p className="text-xl text-red-600">
          Something happened! Please try again!
        </p>
      ) : (
        <FormTextArea value={aboutValue} onChange={setTextAreaValue} />
      )}
      {updateStatus === "success" ? (
        <p className="text py-2 text-green-600">Successfully updated!</p>
      ) : updateStatus === "error" ? (
        <p className="text py-2 text-red-600">
          Something happened! Please try again!
        </p>
      ) : null}
      <FormButton
        text={
          status === "error" || updateStatus === "error" ? "Retry" : "Update"
        }
        loading={buttonLoading}
        click={() => click()}
      />
    </div>
  );
}

import React, { ReactElement, useState } from "react";
import { useHistory } from "react-router-dom";
import { User } from "firebase";
import { Helmet } from "react-helmet";
import "firebase/auth";
import "firebase/firestore";

import FormButton from "../../components/FormButton";

import useFirebase from "../../store/Firebase";
import useSession from "../../store/Session";

export default function Login(): ReactElement {
  const firebase = useFirebase((state) => state.firebase);
  const provider = useFirebase((state) => state.provider);

  const setSession = useSession((state) => state.setSession);

  const [hasError, setHasError] = useState(false);
  const [loading, setLoading] = useState(false);

  const history = useHistory();

  const db = firebase.firestore();

  function submit(): void {
    setHasError(false);
    setLoading(true);
    firebase
      .auth()
      .signInWithPopup(provider)
      .then((result: any) => {
        const { user } = result;
        const { displayName, email, photoURL, uid } = user;

        const userForDB = {
          displayName,
          email,
          photoURL,
          uuid: uid,
        };

        db.collection("users")
          .doc(userForDB.uuid)
          .set(userForDB, { merge: true })
          .catch((error) => {
            if (process.env.NODE_ENV === "dev") {
              console.log(error);
            }
          });

        setLoading(false);
      })
      .catch((error) => {
        if (process.env.NODE_ENV === "dev") {
          console.log(error);
        }
        setHasError(true);
        setLoading(false);
      });
  }

  firebase.auth().onAuthStateChanged((user: User) => {
    if (user) {
      firebase
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
              firebase
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
        .catch((error: any) => {
          if (process.env.NODE_ENV === "dev") {
            console.log(error);
          }
        });

      history.push("/");
    }
  });

  return (
    <>
      <Helmet>
        <meta name="robots" content="noindex" />
      </Helmet>
      <div className="page-contents-height w-full flex justify-center items-center flex-col">
        <p className="text-white text-2xl pb-6">Login</p>
        {hasError ? (
          <p className="text-red-600 pb-6">
            Something happened! Please try again!
          </p>
        ) : null}
        <FormButton text="Login with Google" click={submit} loading={loading} />
      </div>
    </>
  );
}

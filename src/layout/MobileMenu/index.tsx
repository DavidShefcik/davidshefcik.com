import React, { ReactElement, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import "firebase/storage";

import NavLink from "../../types/NavLink";
import navLinks from "../../values/navLinks";

import useMobileMenu from "../../store/MobileMenu";

import useSession from "../../store/Session";

import useFirebase from "../../store/Firebase";

export default function MobileMenu(): ReactElement {
  const mobileMenuVisible = useMobileMenu((state) => state.open);

  const [resumeLink, setResumeLink] = useState("");

  const session = useSession((state) => state.session);

  const firebase = useFirebase((state) => state.firebase);

  const storage = firebase.storage().ref();

  useEffect(() => {
    const resumePDF = storage.child("Resume Edit.pdf");

    resumePDF
      .getDownloadURL()
      .then((url: any) => {
        setResumeLink(url);
      })
      .catch((error: any) => {
        if (process.env.NODE_ENV === "dev") {
          console.log(error);
        }
      });
  }, []);

  return (
    <div
      className={`w-screen bg-secondary-background flex flex-col justify-center items-center overflow-hidden fixed transition-all ease-in duration-75 z-40 top-0 left-0 mobile-menu ${
        mobileMenuVisible ? "mobile-menu-height" : "h-0"
      }`}
    >
      {navLinks.map((link: NavLink) => (
        <HashLink to={link.path} title={link.text} key={link.text}>
          <div className="flex justify-center items-center w-full py-2">
            <p className="text-lg text-gray-400 hover:text-gray-100 transition ease-in duration-100">
              {link.text}
            </p>
          </div>
        </HashLink>
      ))}
      {resumeLink !== "" ? (
        <a href={resumeLink} title="Resume" target="_blank" rel="noreferrer">
          <div className="flex justify-center items-center w-full py-2">
            <p className="text-lg text-gray-400 hover:text-gray-100 transition ease-in duration-100">
              Resume
            </p>
          </div>
        </a>
      ) : null}
      {session.loggedIn === true && session.user != null ? (
        <Link to="/dashboard" title="Dashboard">
          <div className="flex justify-center items-center w-full py-2">
            <p className="text-lg text-gray-400 hover:text-gray-100 transition ease-in duration-100">
              Dashboard
            </p>
          </div>
        </Link>
      ) : null}
    </div>
  );
}

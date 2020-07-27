import React, { ReactElement, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import HamburgerMenu from "react-hamburger-menu";
import "firebase/storage";

import NavLink from "../../types/NavLink";
import navLinks from "../../values/navLinks";

import useMobileMenu from "../../store/MobileMenu";

import useSession from "../../store/Session";

import useFirebase from "../../store/Firebase";

export default function Header(): ReactElement {
  const mobileMenuOpen = useMobileMenu((state) => state.open);
  const toggleMobileMenuOpen = useMobileMenu((state) => state.toggleOpen);

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
    <div className="flex flex-row items-center justify-between bg-secondary-background box-border px-5 h-16 w-full overflow-hidden fixed z-50 shadow">
      <div className="h-full w-3/4 lg:w-1/4 flex justify-center items-center">
        <HashLink
          to="/#home"
          title="David Shefcik"
          className="flex items-center justify-center h-full"
          smooth
        >
          <p className="text-2xl text-white italic">David Shefcik</p>
        </HashLink>
      </div>
      <div className="h-full w-1/4 lg:w-3/4">
        <div className="w-full h-full hidden lg:flex justify-end px-24 items-center flex-row">
          {navLinks.map((link: NavLink) => {
            return (
              <HashLink to={link.path} title={link.text} key={link.text} smooth>
                <div className="flex justify-center items-center h-full px-5">
                  <p className="text-lg text-gray-400 hover:text-gray-100 transition ease-in duration-100">
                    {link.text}
                  </p>
                </div>
              </HashLink>
            );
          })}
          {resumeLink !== "" ? (
            <a
              href={resumeLink}
              title="Resume"
              target="_blank"
              rel="noreferrer"
            >
              <p className="text-lg text-gray-400 hover:text-gray-100 transition ease-in duration-100">
                Resume
              </p>
            </a>
          ) : null}
          {session.loggedIn === true && session.user != null ? (
            <Link to="/dashboard" title="Dashboard">
              <div className="flex justify-center items-center h-full px-5">
                <p className="text-lg text-gray-400 hover:text-gray-100 transition ease-in duration-100">
                  Dashboard
                </p>
              </div>
            </Link>
          ) : null}
        </div>
        <div className="w-full h-full flex lg:hidden justify-center items-center">
          <span className="cursor-pointer">
            <HamburgerMenu
              isOpen={mobileMenuOpen}
              menuClicked={() => toggleMobileMenuOpen()}
              color="white"
              width={30}
              height={20}
              borderRadius={3}
              animationDuration={0.25}
            />
          </span>
        </div>
      </div>
    </div>
  );
}

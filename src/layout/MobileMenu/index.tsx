import React, { ReactElement } from "react";
import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";

import NavLink from "../../types/NavLink";
import navLinks from "../../values/navLinks";

import useMobileMenu from "../../store/MobileMenu";

import useSession from "../../store/Session";

export default function MobileMenu(): ReactElement {
  const mobileMenuVisible = useMobileMenu((state) => state.open);

  const session = useSession((state) => state.session);

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

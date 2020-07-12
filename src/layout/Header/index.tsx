import React, { ReactElement } from "react";
import { Link } from "react-router-dom";
import HamburgerMenu from "react-hamburger-menu";

import NavLink from "../../types/NavLink";
import navLinks from "../../values/navLinks";

import useMobileMenu from "../../store/MobileMenu";

export default function Header(): ReactElement {
  const mobileMenuOpen = useMobileMenu((state) => state.open);
  const toggleMobileMenuOpen = useMobileMenu((state) => state.toggleOpen);

  return (
    <div className="flex flex-row items-center justify-between bg-secondary-background box-border px-5 h-16 w-full overflow-hidden fixed shadow">
      <div className="h-full w-3/4 w-3/4 lg:w-1/4 flex justify-center items-center">
        <Link
          to="/"
          title="David Shefcik"
          className="flex items-center justify-center h-full"
        >
          <p className="text-2xl text-white italic">David Shefcik</p>
        </Link>
      </div>
      <div className="h-full w-1/4 w-1/4 lg:w-3/4">
        <div className="w-full h-full hidden lg:flex justify-center items-center flex-row">
          {navLinks.map((link: NavLink) => {
            return (
              <Link to={link.path} title={link.text} key={link.text}>
                <div className="flex justify-center items-center h-full px-5">
                  <p className="text-lg text-gray-400 hover:text-gray-100 transition ease-in duration-100">
                    {link.text}
                  </p>
                </div>
              </Link>
            );
          })}
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

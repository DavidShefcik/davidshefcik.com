import React, { ReactElement, useEffect } from "react";
import { Switch, Route, useLocation } from "react-router-dom";

import Home from "../pages/Home";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";

import Catch from "../pages/Catch";

import useMobileMenu from "../store/MobileMenu";

export default function Navigation(): ReactElement {
  const mobileMenuVisible = useMobileMenu((state) => state.open);
  const toggleMobileMenu = useMobileMenu((state) => state.toggleOpen);

  const location = useLocation();

  useEffect(() => {
    if (mobileMenuVisible) {
      toggleMobileMenu();
    }
  }, [location]);

  return (
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/login" component={Login} />
      <Route path="/dashboard" component={Dashboard} />
      <Route path="*" component={Catch} />
    </Switch>
  );
}

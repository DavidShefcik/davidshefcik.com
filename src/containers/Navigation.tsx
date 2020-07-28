import React, { ReactElement, useEffect, Suspense, lazy } from "react";
import { Switch, Route, useLocation } from "react-router-dom";

import Loading from "../layout/Loading";

import useMobileMenu from "../store/MobileMenu";

const Home = lazy(() => import("../pages/Home"));
const Login = lazy(() => import("../pages/Login"));
const Dashboard = lazy(() => import("../pages/Dashboard"));
const Catch = lazy(() => import("../pages/Catch"));

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
    <Suspense fallback={<Loading />}>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="*" component={Catch} />
      </Switch>
    </Suspense>
  );
}

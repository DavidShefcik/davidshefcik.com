import React, { ReactElement } from "react";
import { Switch, Route } from "react-router-dom";

import Home from "../pages/Home";
import Login from "../pages/Login";

import Catch from "../pages/Catch";

export default function Navigation(): ReactElement {
  return (
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/login" component={Login} />
      <Route path="*" component={Catch} />
    </Switch>
  );
}

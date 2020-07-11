import React, { ReactElement } from "react";
import { Switch, Route } from "react-router-dom";

import Home from "../pages/Home";

import Catch from "../pages/Catch";

export default function Navigation(): ReactElement {
  return (
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="*" component={Catch} />
    </Switch>
  );
}

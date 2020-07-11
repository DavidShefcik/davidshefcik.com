import React, { ReactElement } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Home from "../pages/Home";

import Catch from "../pages/Catch";

export default function Navigation(): ReactElement {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="*" component={Catch} />
      </Switch>
    </BrowserRouter>
  );
}

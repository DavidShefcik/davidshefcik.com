import React from "react";
import loadable from "@loadable/component";

import Loading from "../../layout/Loading";

export default loadable(() => import("./Component"), {
  fallback: <Loading />,
});

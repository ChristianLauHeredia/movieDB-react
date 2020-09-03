import React, { lazy, Suspense } from "react";
import ReactDOM from "react-dom";
import { HashRouter } from "react-router-dom";
const Routes = lazy(() => import ("./routes"));

ReactDOM.render(
  // Shows fallback fallback until Routes is loaded
  <Suspense fallback={<span>Loading ...</span>}>
    <span>Header</span>
    <HashRouter>
      <Routes />
    </HashRouter>
  </Suspense>
  , document.getElementById("app"),
);

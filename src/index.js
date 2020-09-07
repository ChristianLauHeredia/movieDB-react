import React, { lazy, Suspense } from "react";
import ReactDOM from "react-dom";
import { HashRouter } from "react-router-dom";
const Routes = lazy(() => import ("./routes"));
const Header = lazy(() => import ("./components/header"));
import './translations/i18n.js';
import "./styles/index.scss";

ReactDOM.render(
  // Shows fallback fallback until Routes is loaded
  <Suspense fallback={<span style={{color: "white"}}>Loading ...</span>}>
    <HashRouter>
      <Header />
      <Routes />
    </HashRouter>
  </Suspense>
  , document.getElementById("app"),
);

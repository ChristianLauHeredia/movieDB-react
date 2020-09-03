import React from "react";
import { Route, Switch } from "react-router-dom";
import MainScreen from "./js/components/MainScreen";

const NotFound = () => <h1>404.. This page is not found!</h1>;
const Routes = () => (
    <Switch>
        <Route exact path="/" component={MainScreen} />
        <Route exact path="*" component={NotFound} />
        {/* <Route exact path="/card/:id" component={BusinessCardConfirmation} /> */}
    </Switch>
);

export default Routes;

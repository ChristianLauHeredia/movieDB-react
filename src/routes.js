import React from "react";
import { Route, Switch } from "react-router-dom";
import HomeScreen from "./components/home-screen";
import DetailsScreen from "./components/details-screen";

const NotFound = () => <h1>404.. This page is not found!</h1>;
const Routes = () => (
    <Switch>
        <Route exact path="/" component={HomeScreen} />
        <Route exact path="/show/:id" component={DetailsScreen} />
        <Route exact path="*" component={NotFound} />
    </Switch>
);

export default Routes;

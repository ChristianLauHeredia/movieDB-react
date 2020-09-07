import React from "react";
import { Route, Switch } from "react-router-dom";
import HomeScreen from "./components/home-screen";
import DetailsScreen from "./components/details-screen";
import NotFoundScreen from "./components/not-found-screen";

const Routes = () => (
    <Switch>
        <Route exact path="/" component={HomeScreen} />
        <Route exact path="/show/:id" component={DetailsScreen} />
        <Route exact path="*" component={NotFoundScreen} />
    </Switch>
);

export default Routes;

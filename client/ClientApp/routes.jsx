// @flow

import * as React from "react";
import { Route, Switch } from "react-router-dom";
import HelloWorld from "./Components/HelloWorld";
import Home from "./Components/Home";
import CallToAPIComponent from "./Components/CallToAPI";
import Login from "./Components/Login";
import LoginCallback from "./Components/LoginCallback";

const Routes = (isServer: boolean) => {
	const homeJsx = <Home isServer={isServer}/>;

    const routes = (
        <Switch>
            <Route exact path="/helloworld" render={() => <HelloWorld isServer={isServer} />} />
            <Route exact path="/home" render={() => homeJsx} />
            <Route exact path="/calltoapi" component={CallToAPIComponent} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/logincallback" component={LoginCallback} />
            <Route exact path="/" render={() => homeJsx} />
            <Route render={() => (<div>No Clientside Routing Match</div>)} />
        </Switch>
    );
	
	return routes;
};

export default Routes;
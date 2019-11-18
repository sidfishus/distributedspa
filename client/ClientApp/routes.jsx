// @flow

import * as React from "react";
import { Route, Switch } from "react-router-dom";
import HelloWorld from "./Components/HelloWorld";
import Home from "./Components/Home";
import CallToAPIComponent from "./Components/CallToAPI";
import Login from "./Components/Login";
import LoginCallback from "./Components/LoginCallback";
import { DPAUserManager } from "./Shared/DPAUserManager";
import { StandardPage } from "./Components/Standard Page";

const Routes = (isServer: boolean, userMan: DPAUserManager) => {
    const homeJsx = <Home isServer={isServer}/>;
    
    const StdPage = (props) => {
        return <StandardPage {...props} userMan={userMan} isServer={isServer} />;
    };

    const HomeRender = () => <StdPage pageRender={() => <Home isServer={isServer} />} />;

    const routes = (
        <Switch>
            <Route exact path="/helloworld" render={() => <HelloWorld isServer={isServer} />} />
            <Route exact path="/home" render={HomeRender} />
            <Route exact path="/logoutcallback" render={HomeRender} />} />
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
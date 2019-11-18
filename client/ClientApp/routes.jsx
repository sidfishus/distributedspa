// @flow

import * as React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./Components/Home";
import CallToAPIComponent from "./Components/CallToAPI";
import LoginCallback from "./Components/LoginCallback";
import { DPAUserManager } from "./Shared/DPAUserManager";
import { StandardPage } from "./Components/Standard Page";

const Routes = (isServer: boolean, userMan: DPAUserManager) => {
        
    const StdPage = (props) => {
        return <StandardPage {...props} userMan={userMan} isServer={isServer} />;
    };

    const HomeRender = () => <StdPage pageRender={(props) => <Home {...props} />} />;

    const routes = (
        <Switch>
            <Route exact path="/home" render={HomeRender} />
            <Route exact path="/logoutcallback" render={HomeRender} />} />
            <Route exact path="/calltoapi" component={CallToAPIComponent} />
            <Route exact path="/logincallback" component={LoginCallback} />
            <Route exact path="/" render={HomeRender} />
            <Route render={() => (<div>No Clientside Routing Match</div>)} />
        </Switch>
    );
	
	return routes;
};

export default Routes;
// @flow

import * as React from "react";
import { Route, Switch } from "react-router-dom";
import { Login } from "./Components/Login";
import { GetQSParamF } from "./Shared/Misc";
import { Consent } from "./Components/Consent";

const LoginRouted = (props) => {
    const { location } = props;
    return (
        <Login
            returnUrl={GetQSParamF(location)("returnUrl")}
            {...props}
        />
    );
};

const ConsentRouted = (props) => {
    const { location } = props;
    return (
        <Consent
            returnUrl={GetQSParamF(location)("returnUrl")}
            {...props}
        />
    );
};

const NoRoutingMatch = (what) => {
    return (
        <div>
            No Clientside Routing Match: 
        </div>
    );
};

const Routes = (props) => {

    const routes = (
        <Switch>
            <Route exact path="/account/login" render={(renderProps) => <LoginRouted {...renderProps} {...props} />} />
            <Route exact path="/consent" render={(renderProps) => <ConsentRouted {...renderProps} {...props} />} />
            <Route render={(renderProps) => <NoRoutingMatch {...renderProps} {...props} />} />
        </Switch>
    );
	
	return routes;
};

export default Routes;
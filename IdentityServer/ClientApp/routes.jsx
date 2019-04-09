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

const Routes = ({prerenderData}) => {

    const routes = (
        <Switch>
            <Route exact path="/account/login" render={(props) => <LoginRouted {...props} prerenderData={prerenderData} />} />
            <Route exact path="/consent" render={(props) => <ConsentRouted {...props} prerenderData={prerenderData} />} />
            <Route render={(props) => <NoRoutingMatch {...props} />} />
        </Switch>
    );
	
	return routes;
};

export default Routes;
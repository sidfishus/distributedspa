// @flow

import * as React from "react";
import { Route, Switch } from "react-router-dom";
import { Login } from "./Components/Login";
import { GetQSParamF } from "./Shared/Misc";

const LoginRouted = ({location,history}) => {
    return (
        <Login
            returnUrl={GetQSParamF(location)("returnUrl")}
            history={history}
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

const Routes = () => {

    const routes = (
        <Switch>
            <Route exact path="/account/login" render={(props) => <LoginRouted {...props} />} />
            <Route render={(props) => <NoRoutingMatch {...props} />} />
        </Switch>
    );
	
	return routes;
};

export default Routes;
// @flow

import * as React from "react";
import { Route, Switch } from "react-router-dom";

const Routes = ({props}) => {

    const routes = (
        <Switch>
            <Route render={() => (<div>No Clientside Routing Match</div>)} />
        </Switch>
    );
	
	return routes;
};

export default Routes;
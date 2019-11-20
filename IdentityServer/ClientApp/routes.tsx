// @flow

import * as React from "react";
import { Route, Switch, RouteComponentProps } from "react-router-dom";
import { Login } from "./Components/Login";
import { GetQSParamF } from "./Shared/Misc";
import { Consent } from "./Components/Consent";

export type IScope = {
    required: boolean;
    displayName: string;
};

export type IPrerenderExtra = {
    identityScopes: Array<IScope>;
    apiScopes: Array<IScope>;
    clientName: string;
};

export type IPrerenderData = {
    isAuthenticated: boolean;
    extra: IPrerenderExtra;
};

export type IRoutesProps = {
    prerenderData: IPrerenderData;
    SSR: boolean;
};

export type IRoutedCompProps = RouteComponentProps<any> & IRoutesProps;

const LoginRouted = (props: IRoutedCompProps) => {
    const { location } = props;
    return (
        <Login
            returnUrl={GetQSParamF(location)("returnUrl")}
            {...props}
        />
    );
};

const ConsentRouted = (props: IRoutedCompProps) => {
    const { location } = props;
    return (
        <Consent
            returnUrl={GetQSParamF(location)("returnUrl")}
            {...props}
        />
    );
};

const NoRoutingMatch = (props: IRoutedCompProps) => {
    return (
        <div>
            No Clientside Routing Match.
        </div>
    );
};

const Routes = (props: IRoutesProps) => {

    const routes = (
        <Switch>
            <Route exact path="/account/login" render={(renderProps: RouteComponentProps<any>) => <LoginRouted {...renderProps} {...props} />} />
            <Route exact path="/consent" render={(renderProps: RouteComponentProps<any>) => <ConsentRouted {...renderProps} {...props} />} />
            <Route render={(renderProps: RouteComponentProps<any>) => <NoRoutingMatch {...renderProps} {...props} />} />
        </Switch>
    );
	
	return routes;
};

export default Routes;
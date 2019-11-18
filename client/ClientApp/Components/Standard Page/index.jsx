// @flow

import * as React from "react";
import { Fragment } from "react";
import { Button } from "react-bootstrap";
import { DPAUserManager } from "../../Shared/DPAUserManager";
import * as Oidc from "oidc-client";

type IStandardPageProps = {
    userMan: ?DPAUserManager;
    pageRender: (props: Object) => React.Node;
};

type IStandardPageState = {
    user: Oidc.User;
};

const initialState : IStandardPageState = {
    user: null
};

export class StandardPage extends React.PureComponent<IStandardPageProps,IStandardPageState> {

    SetUserLoaded: (user: Oidc.User) => void;

    constructor(props: IStandardPageProps) {
        super(props);

        this.state={...initialState};

        const thisAsAny:any = this;
        thisAsAny.setState = this.setState.bind(this);

        this.SetUserLoaded=this.SetUserLoaded.bind(this);
    }

    componentDidMount() {
        const { userMan } = this.props;
        if(userMan) {
            // This will cause the user to login if they havn't already
            userMan.Initialise(this.SetUserLoaded);
        }
    }

    SetUserLoaded(user: Oidc.User): void {
        this.setState(() => {
            return {
                user: user
            };
        });
    }

    render() {
        const { user } = this.state;
        const { pageRender, userMan } = this.props;

        if(!user || !userMan) {
            return null;
        }

        return (
            <Fragment>
                <p>Logged in as: {user.profile.name}</p>
                <LogoutButton userMan={userMan} />
                <hr />
                {pageRender(this.props)}
            </Fragment>
        );
    }
};

const LogoutClick = (userMan: DPAUserManager) => {
    userMan.Logout();
};

const LogoutButton = ({userMan}) => {
    return (
        <Button
            onClick={() => LogoutClick(userMan)}
        >
            Logout
        </Button>
    );
};
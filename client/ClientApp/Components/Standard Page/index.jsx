
import * as React from "react";
import { Fragment } from "react";
import { Button } from "react-bootstrap";

const initialState = {
    user: null
};

export class StandardPage extends React.PureComponent {

    constructor(props) {
        super(props);

        this.state={...initialState};

        this.setState = this.setState.bind(this);
        this.SetLoaded=this.SetLoaded.bind(this);
    }

    componentDidMount() {
        const { userMan } = this.props;
        if(userMan) {
            // This will cause the user to login if they havn't already
            userMan.Initialise(this.SetLoaded);
        }
    }

    SetLoaded(user) {
        this.setState(() => {
            return {
                user: user
            };
        });
    }

    render() {
        const { user } = this.state;
        const { pageRender, userMan } = this.props;

        if(!user) {
            return null;
        }

        return (
            <Fragment>
                <p>Logged in as: {user.profile.name}</p>
                <LogoutButton userMan={userMan} />
                <hr />
                {pageRender()}
            </Fragment>
        );
    }
};

const LogoutClick = (userMan) => {
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

import * as React from "react";
import { withRouter } from "react-router-dom";
import * as Oidc from "oidc-client";

// See below for help with this.
// http://docs.identityserver.io/en/latest/quickstarts/6_javascript_client.html
class LoginCallback extends React.PureComponent {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const { history } = this.props;

        new Oidc.UserManager(
            {response_mode:"query"}
        ).signinRedirectCallback().then(() => {
            history.push("./login");
        });
    }

    render() {
        return null;
    }
};

export default withRouter(LoginCallback);
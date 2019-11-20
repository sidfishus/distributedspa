// @flow

import * as Oidc from "oidc-client";
import { URLs_CLIENT, URLs_IDENTITY_SERVER } from "../Shared/URLs";

export class DPAUserManager {

    m_UserManager: Oidc.UserManager;

    constructor() {
        this.m_UserManager=null;
    }

    // Call this within the componentDidMount method of a React component.
    Initialise(fOnLoaded: (user: Oidc.User) => void) {
        if(!this.m_UserManager) {
            var config = {
                authority: URLs_IDENTITY_SERVER,
                client_id: "DistributedSPAClient",
                redirect_uri: `${URLs_CLIENT}/logincallback`,
                response_type: "code",
                scope:"openid DistributedSPA",
                post_logout_redirect_uri : `${URLs_CLIENT}/logoutcallback`,
            };
            this.m_UserManager = new Oidc.UserManager(config);
        }

        this.m_UserManager.getUser().then(user => {
            if(!user) {
                this.m_UserManager.signinRedirect();
            }
            else {
                fOnLoaded(user);
            }
        });
    }

    Logout() {
        this.m_UserManager.signoutRedirect();
    }

    // Get the logged in user and call a function with the user as a parameter
    WithUser(f: (user: Oidc.User) => void) {
        this.m_UserManager.getUser().then(user => {
            if(!user) {
                this.m_UserManager.signinRedirect();
            }
            else {
                f(user);
            }
        });
    }
};
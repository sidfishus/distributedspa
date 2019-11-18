// @flow

import * as Oidc from "oidc-client";

export class DPAUserManager {

    m_UserManager;

    constructor() {
        this.m_UserManager=null;
    }

    // Call this within the componentDidMount method of a React component.
    Initialise(fOnLoaded) {
        if(!this.m_UserManager) {
            //sidtodo change the URL's
            var config = {
                authority: "http://localhost:5099",
                client_id: "DistributedSPAClient",
                redirect_uri: "http://localhost:5000/logincallback",
                response_type: "code",
                scope:"openid DistributedSPA",
                post_logout_redirect_uri : "http://localhost:5000/logoutcallback",
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
    WithUser(f) {
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
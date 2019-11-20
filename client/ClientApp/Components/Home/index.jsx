// @flow

import * as React from "react";
import { Fragment } from "react";

// Provides access to the history object/routing match
import { withRouter } from "react-router-dom";
import { Button } from "react-bootstrap";
import { HttpAuthGetJson, CreateAPIURL } from "../../Shared/http";
import { DPAUserManager } from "../../Shared/DPAUserManager";

type IHomeProps = {
    userMan: DPAUserManager;
};

type IHomeState = {
    errorMsg: ?string;

    // Requesting data?
    reqData: boolean;

    // Loaded data from the API
    loadedData: ?string;
};

const initialState : IHomeState = {
    errorMsg: null,
    reqData: false,
    loadedData: null
};

class Home extends React.PureComponent<IHomeProps,IHomeState> {

    constructor(props: IHomeProps) {
        super(props);
        this.state = {...initialState };
        this.BindThis();
    }

    BindThis() {
        this.CallAPIClick=this.CallAPIClick.bind(this);
    }

    render() {

        const { reqData, errorMsg, loadedData } = this.state;

        if(errorMsg) {
            return (
                <p>Error: {errorMsg}</p>
            );
        }

        if(reqData) {
            return (
                <p>Loading data from the API...</p>
            );
        }

        return (
            <Fragment>
                <Button
                    text="Call API"
                    onClick={this.CallAPIClick}
                >
                    Call API
                </Button>

                {loadedData &&
                    <Fragment>
                        <br />
                        <br />
                        Loaded data: 
                        <p>{loadedData}</p>
                    </Fragment>
                }
            </Fragment>
        );
    }

    CallAPIClick: Function;
    CallAPIClick() {
        const { userMan } = this.props;

        userMan.WithUser(user => {
            HttpAuthGetJson(user,CreateAPIURL("TestAPI/TestAction")).then(res => {
                this.setState(() => {
                    return {
                        reqData: false,
                        loadedData: JSON.stringify(res.data)
                    };
                });
            }).catch((res) => {
                let errorMsg;
                if(res.response && res.response.data) {
                    errorMsg=res.response.data;
                }
                else {
                    errorMsg=res.message;
                    if(errorMsg === "Network Error") {
                        // See this article for help:
                        // https://medium.com/@ali.dev/how-to-trust-any-self-signed-ssl-certificate-in-ie11-and-edge-fa7b416cac68
                        errorMsg = `${errorMsg}. This may also happen if a browser SSL certificate has not been installed for the API application.`;
                    }
                }

                this.setState(() => {
                    return {
                        loadedData: null,
                        errorMsg: errorMsg,
                        reqData: false
                    };
                });
            });
        });

        this.setState({
            reqData: true
        });
    }
};

export default withRouter(Home);
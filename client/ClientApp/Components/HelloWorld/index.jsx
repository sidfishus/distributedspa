// @flow

import * as React from "react";
import { withRouter } from "react-router-dom";

interface IHelloWorldProps {
    isServer: boolean
}

class HelloWorld extends React.Component<IHelloWorldProps> {
    constructor(props: IHelloWorldProps) {
        super(props);
    }

    IsServer() : boolean {
        return ((this.props.isServer)?true:false);
    }

    render() {
        // This causes the fllowing warning in Chrome:
        // "VM7377:37 Warning: Text content did not match. Server: "Server" Client: "Client""
        // Because the HTML rendered varies between server and client (which is my intention)
        // It's OK to ignore this error and go on about your business as usual
        return <h1>Hello World<br/> - {(this.IsServer()?"Server":"Client")} x</h1>;
    }
};

export default withRouter(HelloWorld);
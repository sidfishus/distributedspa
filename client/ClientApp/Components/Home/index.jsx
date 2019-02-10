// @flow

import * as React from "react";
import HelloWorld from "../HelloWorld";

// Provides access to the history object/routing match
import { withRouter } from "react-router-dom";

const Home = (props: any) => {
    return (
        <HelloWorld
            isServer={props.isServer}
        />
    );
};

export default withRouter(Home);
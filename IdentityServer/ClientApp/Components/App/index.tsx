// @flow

import * as React from "react";
import Routes from "../../routes";
import { BrowserRouter } from "react-router-dom";
import { hot } from "react-hot-loader/root";

// The purpose of creating the application like this is to enable webpack 'hot' module replacement across the board
// and as recommended by the documentation for 'react-hot-loader'. Enabling HMR in .NET was quite tricky and I found
// the following links helpful in getting it to work:
// https://natemcmaster.com/blog/2018/07/05/aspnetcore-hmr/
// https://github.com/aspnet/JavaScriptServices/issues/1204
// Thankyou for all who contributed and it's great to see how open-source is flourishing.

// Note: this is only ever called when the app rendered in the browser. SSR does not use this component.
const App = () => {

    const windowAsAny: any = window;

	return (
        <BrowserRouter>
            <Routes
                prerenderData={windowAsAny.prerenderData}
                SSR={false}
            />
        </BrowserRouter>
    );
};

// Causes all components of this application to have hot loading
// see: https://github.com/gaearon/react-hot-loader
export default hot(App);
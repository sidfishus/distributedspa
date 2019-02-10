// @flow

import { createServerRenderer } from "aspnet-prerendering";
import { renderToString } from "react-dom/server";
import * as React from "react";
import Routes from "./routes";
import { StaticRouter } from "react-router-dom";

// SSPR begins here
// To debug this, use 'chrome://inspect' and 'open dedicated tools for Node'.
export default createServerRenderer(params => {
    return new Promise((resolve, reject) => {

        const routes = Routes(true);

        let routerContext = { };
        const app = (
            <StaticRouter context={routerContext} location={params.location.path} children={routes} />
        );

        let rendered=renderToString(app);

        params.domainTasks.then(() => {
            resolve({
                html: rendered,
            });
        },reject);
    });
});
import { createServerRenderer } from "aspnet-prerendering";
import { renderToString } from "react-dom/server";
import * as React from "react";

// SSPR begins here
// To debug this, use 'chrome://inspect' and 'open dedicated tools for Node'.
export default createServerRenderer(params => {
    return new Promise((resolve, reject) => {

        let routerContext = { };
        const app = (
            <div>hello</div>
        );

        let rendered=renderToString(app);

        params.domainTasks.then(() => {
            resolve({
                html: rendered,
            });
        },reject);
    });
});
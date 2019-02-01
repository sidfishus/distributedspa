import { createServerRenderer } from "aspnet-prerendering";
import { renderToString } from "react-dom";
import * as React from "react";

// SSPR begins here
export default createServerRenderer(params => {
    return new Promise((resolve, reject) => {

        params.domainTasks.then(() => {
            resolve({
                html: "Hello World<br/> - Server x" // Replace this with the application
            });
        },reject);
    });
});
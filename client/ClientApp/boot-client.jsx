// @flow

import * as React from "react";
import * as ReactDOM from "react-dom";
import Routes from "./routes";
import { BrowserRouter } from "react-router-dom";

function RenderApp() {
	let reactElement = document.getElementById("react");

	if (reactElement) {
		let routes=Routes(false);

		ReactDOM.hydrate(
			<BrowserRouter>
				{routes}
			</BrowserRouter>
		, reactElement);
	}
}

RenderApp();
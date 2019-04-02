// @flow

import * as React from "react";
import * as ReactDOM from "react-dom";
import App from "./Components/App";

function RenderApp() {
	let reactElement = document.getElementById("react");

	if (reactElement) {
		ReactDOM.hydrate(
			<App />
		, reactElement);
	}
}

RenderApp();
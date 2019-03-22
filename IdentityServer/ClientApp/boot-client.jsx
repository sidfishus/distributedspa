// @flow

import * as React from "react";
import * as ReactDOM from "react-dom";

function RenderApp() {
	let reactElement = document.getElementById("react");

	if (reactElement) {
		ReactDOM.hydrate(
			<div>{window.location.pathname}</div>
		, reactElement);
	}
}

RenderApp();
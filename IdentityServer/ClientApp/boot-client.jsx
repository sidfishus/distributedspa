// @flow

import * as React from "react";
import * as ReactDOM from "react-dom";
import { Login } from "./Components/Login";

function RenderApp() {
	let reactElement = document.getElementById("react");

	if (reactElement) {
		ReactDOM.hydrate(
			<Login />
		, reactElement);
	}
}

RenderApp();
// @flow

import * as React from "react";
import * as ReactDOM from "react-dom";
import App from "./Components/App"
import { DPAUserManager } from "./Shared/DPAUserManager";

function RenderApp() {
	let reactElement = document.getElementById("react");

	if (reactElement) {

		const userMan=new DPAUserManager();

		ReactDOM.hydrate(
			<App userMan={userMan} />
		, reactElement);
	}
}

RenderApp();
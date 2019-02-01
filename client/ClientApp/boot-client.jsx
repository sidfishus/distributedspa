// @flow

import * as React from "react";
import * as ReactDOM from "react-dom";

function RenderApp() {
	let reactApp = document.getElementById("react-app");

	if (reactApp) {
		let appJSX = (
			<div>Hello world, from React and .NET MVC Core</div>
		);
		ReactDOM.render(appJSX, reactApp);
	}
}

RenderApp();
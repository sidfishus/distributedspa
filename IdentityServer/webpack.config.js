const merge = require("webpack-merge");
const path = require("path");

const sharedConfig = {
	watch: true,
	mode: "development",
	module: {
		rules: [
			{
				test: /(\.ts$|\.tsx$)/,
				use: 'ts-loader',
				exclude: /node_modules/,
			},
		]
	},
	resolve: {
		extensions: ['.js', '.tsx', '.ts']
	},
	stats: { modules: false }, /* This changes the run webpack output */
};

const clientConfig = merge(sharedConfig, {
	entry: {
		"main-client": [
			"babel-polyfill",
			"core-js",
			"./ClientApp/boot-client.tsx"
		]
	},
	output: {
		path: path.join(__dirname,"/wwwroot/js"),
		// Key for hot module replacement (below). Corresponds to the
		// WebpackDevMiddlewareOptions.HotModuleReplacementEndpoint option directory
		publicPath: "/wwwroot/"
	},
	devtool: "eval-source-map",
});

const serverBundleConfig = merge(sharedConfig, {
	entry: {
		"main-server": [
			"babel-polyfill",
			"core-js",
			"./ClientApp/boot-server.tsx"
		]
	},
	output: {
		libraryTarget: "commonjs",
		path: path.join(__dirname, "./Server")
	},
	target: "node",
	devtool: "inline-source-map"
});

module.exports = (env) => {
	return [clientConfig, serverBundleConfig];
};
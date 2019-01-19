module.exports = {
	watch: false,
	context: __dirname,
	entry: "./ClientApp/boot-client.jsx",
	output: {
		path: __dirname + "/wwwroot/js",
		filename: "main-client.js"
	},
	mode: "development",
	devtool: "eval-source-map",
	module: {
		rules: [
			{
				test: /\.jsx/,
				exclude: /(node_modules)/,
				use: {
					loader: "babel-loader",
					options: {
						presets: [
							["babel-preset-env", {
								"targets": {
									"browsers": [
										"last 2 versions",
										"IE >= 11"
									]
								},
								"useBuiltIns": true
							}], "babel-preset-react", "flow"],
						plugins: ["transform-object-rest-spread"]
					}
				}
			}
		]
	},
	resolve: {
		extensions: ['.js', '.jsx']
	}
}
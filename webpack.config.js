// https://webpack.js.org/concepts/

const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

module.exports = {
	entry: "./index.js",
	module: {
		rules: [
			{
				test: /\.s[ac]ss$/i,
				use: [
					// Creates `style` nodes from JS strings
					"style-loader",
					// Translates CSS into CommonJS
					"css-loader?url=false",
					// Compiles Sass to CSS
					"sass-loader",
				],
			},
			{
				test: /\.js$/i,
				exclude: /node_modules/,
				use: {
					loader: "babel-loader",
				},
			},
			/*{
				test: /\.(png|jpe?g|gif)$/i,
				use: [
					{
						loader: "file-loader",
					},
				],
			},*/
		],
	},
	output: {
		// we currently output into root instead of dist to be able to host it on github pages
		path: path.resolve(__dirname, "./"),
		filename: "bundle.min.js",
	},
	mode: process.env.NODE_ENV === "production" ? "production" : "development",
	plugins: [
		// will automatically inject bundle js into html
		new HtmlWebpackPlugin({
			template: path.resolve(__dirname, "./", "home.html"),
			filename: "index.html",
		}),
	],
};

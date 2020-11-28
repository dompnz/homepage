// https://webpack.js.org/concepts/

const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

module.exports = {
	entry: "./js/index.js",
	module: {
		rules: [
			{ test: /\.css$/i, use: ["style-loader", "css-loader"] },
			{
				test: /\.(js)$/i,
				exclude: /node_modules/,
				use: {
					loader: "babel-loader",
				},
			},
		],
	},
	output: {
		path: path.resolve(__dirname, "js"),
		filename: "bundle.min.js",
	},
	mode: process.env.NODE_ENV === "production" ? "production" : "development",
	plugins: [
		new HtmlWebpackPlugin({
			template: path.resolve(__dirname, "./", "index.html"),
		}),
	],
};

const {resolve} = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const {BundleAnalyzerPlugin} = require("webpack-bundle-analyzer");
const {CleanWebpackPlugin} = require("clean-webpack-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");

module.exports = {
	mode: "production",
	entry: resolve(__dirname, "./src/app.js"),
	output: {
		filename: "bundle.[contenthash].js",
		path: resolve(__dirname, "dist"),
	},
	module:{
		rules:[
			{
				test: /\.(png|jpe?g|webp|git|svg|)$/i,
				use: [
					{
						loader: "img-optimize-loader",
						options: {
							compress: {
								webp: true,
								disableOnDevelopment: true,
							},
							name: "[name].[ext]",
						},
					},
				],
			},
			{test: /\.gif$/i,
				loader:"file-loader",
				exclude: /node_modules/,
				options:{
					outputPath: "gif",
					name: "[name].[ext]",
				}
			},
			{test: /\.mp3$/i,
				loader:"file-loader",
				exclude: /node_modules/,
				options:{
					outputPath: "sound",
					name: "[name].[ext]",
				}
			},
			{test: /\.mp4$/i,
				loader:"file-loader",
				exclude: /node_modules/,
				options:{
					outputPath: "video",
					name: "[name].[ext]",
				}
			},
			{test: /\.css$/i,
				exclude: /node_modules/,
				use:[MiniCssExtractPlugin.loader, "css-loader"]
			},
			{test: /\.s[ac]ss$/i,
				exclude: /node_modules/,
				use:[MiniCssExtractPlugin.loader, "css-loader", "sass-loader"]
			},
		]
	},
	plugins:[
		new HtmlWebpackPlugin({template: resolve(__dirname, "./public/index.html")}),
		new MiniCssExtractPlugin({filename: "[name].[contenthash].css"}),
		new BundleAnalyzerPlugin({}),
		new CleanWebpackPlugin
	],
	devServer: {
		port: 9000,
		hot: true,
	},
	optimization: {
		minimizer: [new UglifyJsPlugin({
			test: /\.js(\?.*)?$/i,
		}),],
	}
};

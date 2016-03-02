module.exports = [
	require("./make-webpack-config")({
		// commonsChunk: true,
		longTermCaching: true,
		separateStylesheet: true,
		minimize: false,
		devServer: false,
		flaskDir:true,
		//devtool: "source-map"
	}),
];
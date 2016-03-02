var path = require("path");
var webpack = require("webpack");
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var StatsPlugin = require("stats-webpack-plugin");
var loadersByExtension = require("./config/loadersByExtension");
var ExportFilesWebpackPlugin = require('export-files-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

const AUTOPREFIXER_BROWSERS = [
  'Android 2.3',
  'Android >= 4',
  'Chrome >= 20',
  'Firefox >= 24',
  'Explorer >= 8',
  'iOS >= 6',
  'Opera >= 12',
  'Safari >= 6'
];

module.exports = function(options) {
	var entry = {
		main: "./config/mainApp"
	};
	var loaders = {
		"jsx": {
			loaders: options.hotComponents ? ["react-hot-loader", "babel-loader?stage=0"] : ["babel-loader?stage=0"],
			include: [ path.join(__dirname, "src/"), 
				       path.join(__dirname, "config/")
				     ]
		},
		"js": {
			loader: "babel-loader?stage=0",
			include: [ path.join(__dirname, "src/"), 
				       path.join(__dirname, "config/")
				     ]
		},
		"json": "json-loader",
		"coffee": "coffee-redux-loader",
		"json5": "json5-loader",
		"txt": "raw-loader",
		"png|jpg|jpeg|gif|svg": "url-loader?limit=10000",
		"woff|woff2": "url-loader?limit=100000",
		"ttf|eot": "file-loader",
		"wav|mp3": "file-loader",
		"html": "html-loader",
		"tsv": "dsv-loader",
		"md|markdown": ["html-loader", "markdown-loader"]
	};
	var cssLoader = options.minimize ? "css-loader?module" : "css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss-loader";
	var stylesheetLoaders = {
		"css": cssLoader,
		"less": [cssLoader, "less-loader"],
		"styl": [cssLoader, "stylus-loader"],
		"scss|sass": [cssLoader, "sass-loader"]
	};
	var additionalLoaders = [
		// { test: /some-reg-exp$/, loader: "any-loader" }
	];
	var alias = {

	};
	var aliasLoader = {

	};
	var externals = [

	];
	var modulesDirectories = ["web_modules", "node_modules"];
	var extensions = ["", ".web.js", ".js", ".jsx"];
	var root = path.join(__dirname, "src");
	var publicPath = options.devServer ?
		"http://localhost:2992/_assets/" :
		( options.flaskDir? "/_assets/public/" : "/_assets/");
	var output = {
		path: path.join(__dirname, options.flaskDir? "server/_assets":"build", options.prerender ? "prerender" : "public"),
		publicPath: publicPath,
		filename: "[name].js" + (options.longTermCaching && !options.prerender ? "?[chunkhash]" : ""),
		chunkFilename: (options.devServer ? "[id].js" : "[name].js") + (options.longTermCaching && !options.prerender ? "?[chunkhash]" : ""),
		sourceMapFilename: "debugging/[file].map",
		libraryTarget: options.prerender ? "commonjs2" : undefined,
		pathinfo: options.debug || options.prerender
	};
	var excludeFromStats = [
		/node_modules[\\\/]react(-router)?[\\\/]/,
		/node_modules[\\\/]items-store[\\\/]/
	];
	var plugins = [
		new webpack.PrefetchPlugin("react"),
		new webpack.PrefetchPlugin("react/lib/ReactComponentBrowserEnvironment"),
	    new HtmlWebpackPlugin({
	      inject: true,
	      filename: 'server/templates/index.html',
	      template: 'src/simple.html'
    }),
    new ExportFilesWebpackPlugin('server/templates/index.html'),
    new webpack.IgnorePlugin(/vertx/)
	];
	if(options.prerender) {
		plugins.push(new StatsPlugin(path.join(__dirname, "build", "stats.prerender.json"), {
			chunkModules: true,
			exclude: excludeFromStats
		}));
		aliasLoader["react-proxy$"] = "react-proxy/unavailable";
		aliasLoader["react-proxy-loader$"] = "react-proxy-loader/unavailable";
		externals.push(
			/^react(\/.*)?$/,
			/^reflux(\/.*)?$/,
			"superagent",
			"async"
		);
		plugins.push(new webpack.optimize.LimitChunkCountPlugin({ maxChunks: 1 }));
	} else {
		plugins.push(new StatsPlugin(path.join(__dirname, "build", "stats.json"), {
			chunkModules: true,
			exclude: excludeFromStats
		}));
	}
	if(options.commonsChunk) {
		plugins.push(new webpack.optimize.CommonsChunkPlugin("commons", "commons.js" + (options.longTermCaching && !options.prerender ? "?[chunkhash]" : "")));
	}
	/*
	var asyncLoader = {
		test: require("./src/route-handlers/async").map(function(name) {
			return path.join(__dirname, "src", "route-handlers", name);
		}),
		loader: options.prerender ? "react-proxy-loader/unavailable" : "react-proxy-loader"
	};*/



	Object.keys(stylesheetLoaders).forEach(function(ext) {
		var stylesheetLoader = stylesheetLoaders[ext];
		if(Array.isArray(stylesheetLoader)) stylesheetLoader = stylesheetLoader.join("!");
		if(options.prerender) {
			stylesheetLoaders[ext] = stylesheetLoader.replace(/^css-loader/, "css-loader/locals");
		} else if(options.separateStylesheet) {
			stylesheetLoaders[ext] = ExtractTextPlugin.extract("style-loader", 'css-loader!postcss-loader');
		} else {
			stylesheetLoaders[ext] = "style-loader!" + stylesheetLoader;
		}
	});
	if(options.separateStylesheet && !options.prerender) {
		plugins.push(new ExtractTextPlugin("[name].css" + (options.longTermCaching ? "?[contenthash]" : "")));
	}
	if(options.minimize && !options.prerender) {
		plugins.push(
			new webpack.optimize.UglifyJsPlugin({
				compressor: {
					warnings: false
				}
			}),
			new webpack.optimize.DedupePlugin()
		);
	}
	if(options.minimize) {
		plugins.push(
			new webpack.DefinePlugin({
				"process.env": {
					NODE_ENV: JSON.stringify("production")
				}
			}),
			new webpack.NoErrorsPlugin()
		);
	}

	return {
		entry: entry,
		output: output,
		target: options.prerender ? "node" : "web",
		module: {
			preLoaders: [
			      {
			        //Eslint loader
			        test: /\.(js|jsx)$/,
			        loader: 'eslint-loader',
					exclude: [path.resolve(__dirname, 'node_modules')],
					include: [ path.join(__dirname, "src/"), 
						       path.join(__dirname, "config/")
						     ]
			      },
			    ],
			loaders: loadersByExtension(loaders).concat(loadersByExtension(stylesheetLoaders)).concat(additionalLoaders)
		},            //[asyncLoader].concat(
		//eslint config options. Part of the eslint-loader package
	    eslint: {
	     configFile: '.eslintrc'
	    },
		devtool: options.devtool,
		debug: options.debug,
		resolveLoader: {
			root: path.join(__dirname, "node_modules"),
			alias: aliasLoader
		},
		postcss: [
		    require('postcss-nested')(),
		    require('cssnext')(),
		    require('autoprefixer-core')(AUTOPREFIXER_BROWSERS)
	    ],
		externals: externals,
		resolve: {
			root: root,
			modulesDirectories: modulesDirectories,
			extensions: extensions,
			alias: alias
		},
		plugins: plugins,
		devServer: {
			stats: {
				cached: false,
				exclude: excludeFromStats
			}
		}
	};
};

// command for live-reload: webpack-dev-server --inline --hot
"use strict";

const webpack = require("webpack");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const NODE_ENV = process.env.NODE_ENV || "development";

module.exports = {
  context: __dirname + "/app/frontend",

  entry: {  
    app: './main'
  },

  output: {
    path: __dirname + '/public',
    publicPath: '/',
    filename:   '[name].js'
  },

  watch: NODE_ENV == 'development',

  watchOptions: {
    aggregateTimeout: 100
  },

  devtool: NODE_ENV == 'development' ? "cheap-inline-module-source-map" : null,

  resolve: {
    extensions: ['', '.js']
  },

  module: {

    loaders: [
	    {
	      loader:  "babel",
	      test: /\.jsx?$/,
	      include: __dirname + '/frontend',
	      query: {
	        presets: ['es2016']
	      }
	    },
	    {
	      test: /\.less$/,
	      loader: "style!css!less"
	    },
	    {
	      test:   /\.jade$/,
	      loader: "jade"
	    }
    ],

    noParse:  wrapRegexp(/\/node_modules\/(angular\/angular)/, 'noParse')
  },

  plugins: [
  new webpack.ProvidePlugin({
    lodash_: 'lodash',
    angular_: 'angular',
    angular_material: 'angular-material' 
  }),
  new webpack.optimize.CommonsChunkPlugin({name: "common"})
  ],

  devServer: {
    host: 'localhost',
    port: 8080,
    contentBase: __dirname + '/app/backend',
    hot: true
  }
};

function wrapRegexp(regexp, label) {
  regexp.test = function(path) {
    console.log(label, path);
    return RegExp.prototype.test.call(this, path);
  };
  return regexp;
}

var path = require("path")
var webpack = require('webpack')
var git = require('git-rev-sync')
var ExtractPlugin = require('extract-text-webpack-plugin')

var production = process.env.NODE_ENV === 'production'

// The full git revision - make this work both in development and in production (on Heroku)
if (production) {
  // This environment variable is set by Heroku
  var revision = process.env.SOURCE_VERSION
} else {
  var revision = git.long()
}
revision = revision.substring(0, 7)

var plugins = [
  new ExtractPlugin('bundle.css'),
  new webpack.DefinePlugin({
    REVISION: JSON.stringify(revision)
  })
]

if (production) {
    plugins = plugins.concat([

        // This plugin looks for similar chunks and files
        // and merges them for better caching by the user
        new webpack.optimize.DedupePlugin(),

        // This plugins optimizes chunks and modules by
        // how much they are used in your app
        new webpack.optimize.OccurenceOrderPlugin(),

        // This plugin prevents Webpack from creating chunks
        // that would be too small to be worth loading separately
        new webpack.optimize.MinChunkSizePlugin({
            minChunkSize: 51200, // ~50kb
        }),

        // This plugin minifies all the Javascript code of the final bundle
        new webpack.optimize.UglifyJsPlugin({
            mangle:   true,
            compress: {
                warnings: false, // Suppress uglification warnings
            },
        }),
        new webpack.DefinePlugin({
          'process.env.NODE_ENV': JSON.stringify('production')
        })
    ]);
}

module.exports = {
    entry: "./main",
    output: {
        path: path.resolve(__dirname + '/public'),
        filename: "bundle.js"
    },
    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: [".ts", ".tsx", ".js", ".json"]
    },
    module: {
        rules: [
          {
            test: /\.tsx?$/,
            loader: "babel-loader!awesome-typescript-loader"
          },
          {
            test: /\.js/,
            loader: 'babel-loader',
            exclude: /(node_modules|bower_components)/ },
          {
              test:   /\.scss/,
              loader: ExtractPlugin.extract({fallback: 'style-loader', use: 'css-loader!sass-loader'}),
          },
          // the url-loader uses DataUrls.
          // the file-loader emits files.
          {
            test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
            loader: "url-loader?limit=10000&minetype=application/font-woff" },
          {
            test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
            loader: "file-loader"
          }
        ]
    },
    plugins: plugins,
    devtool: production ? false : 'eval'
};

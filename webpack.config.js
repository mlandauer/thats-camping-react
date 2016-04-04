var webpack = require('webpack')
var git = require('git-rev-sync')

var production = process.env.NODE_ENV === 'production'

// The full git revision - make this work both in development and in production (on Heroku)
if (production) {
  // This environment variable is set by Heroku
  var revision = process.env.SOURCE_VERSION
} else {
  var revision = git.long()
}
revision = revision.substring(0, 7)

module.exports = {
    entry: "./main.js",
    output: {
        path: "public",
        filename: "bundle.js"
    },
    module: {
        loaders: [
            {
                test:   /\.js/,
                loader: 'babel',
                exclude: /(node_modules|bower_components)/,
            }
        ],
    },
    plugins: [
      new webpack.DefinePlugin({
        REVISION: JSON.stringify(revision)
      })
    ]
};

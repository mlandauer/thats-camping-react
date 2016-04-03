var GitRevisionPlugin = require('git-revision-webpack-plugin')

var production = process.env.NODE_ENV === 'production'

var plugins = []

// We don't have a git repository when compiling in production on Heroku. So,
// don't even try to use the git revision plugin
if (!production) {
  plugins = plugins.concat([
    new GitRevisionPlugin()
  ])
}

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
    plugins: plugins
};

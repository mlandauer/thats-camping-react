var GitRevisionPlugin = require('git-revision-webpack-plugin')

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
      new GitRevisionPlugin()
    ]
};

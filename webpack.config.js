module.exports = {
    entry: "./app.js",
    devtool: "inline-sourcemap",
    target: "node",
    output: {
        filename: "bundle.js",
        path: __dirname + "/build",
        publicPath: "build/"
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: [/node_modules/, "main.js"],
                loader: 'babel-loader',
                query: {
                    presets: ['react', 'es2015']
                }
            },
            {
                test: /\.scss$/,
                exclude: [/node_modules/],
                loaders: ['style', 'css', 'sass']
            },
            {
                test: /\.woff2?$|\.ttf$|\.eot$|\.svg$/,
                loader: 'file?name=[name]-[hash].[ext]'
            }
        ]
    },
    resolve: {
        extensions: ['', '.js']
    }
}

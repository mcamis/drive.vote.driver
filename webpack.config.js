const autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HTMLWebpackPluginConfig = new HtmlWebpackPlugin({
    template: './app/index.html',
    filename: 'index.html',
    inject: 'body'
});

module.exports = {
    entry: [
        './app/scripts/index.js',
        'bootstrap-loader'
    ],
    output: {
        path: './dist',
        filename: "bundle.js"
    },
    watch: true,
    plugins: [HTMLWebpackPluginConfig],
    module: {
        preLoaders: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'eslint'
        }],
        loaders: [
        {
            test: [/\.js$/, /\.es6$/],
            exclude: /node_modules/,
            loader: "babel-loader",
            query: {
                presets: ['react', 'es2015', "stage-1"],
                plugins: ['transform-decorators-legacy', ],
            }
        },
        {
            test: /\.css$/,
            loaders: [
              'style',
              'css?modules&importLoaders=1&localIdentName=[name]__[local]__[hash:base64:5]',
              'postcss',
            ],
        },
        {
            test: /\.scss$/,
            loaders: [
                  'style',
                  'css?modules&importLoaders=2&localIdentName=[name]__[local]__[hash:base64:5]',
                  'postcss',
                  'sass',
            ],
        },
        {
            test: /\.woff2?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
            loader: 'url?limit=10000',
        },
        {
            test: /\.(ttf|eot|svg)(\?[\s\S]+)?$/,
            loader: 'file',
        },
        ]
    },
    resolve: {
        extensions: ['', '.js', '.es6']
    },
    eslint: {
        failOnWarning: false,
        failOnError: true
    },
    devServer: {
        historyApiFallback: true
    },
    postcss: [autoprefixer],


};

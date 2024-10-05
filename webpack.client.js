const Merge = require('webpack-merge')
const path = require("path")
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { WebpackManifestPlugin } = require("webpack-manifest-plugin")
const base = require('./webpack.base')

module.exports = Merge.merge(base, {
    mode: "development",
    entry: {
        client: path.join(__dirname, './src/entry-client.js')
    },
    output: {
        publicPath: '/'
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            }
        ]
    },
    plugins: [
        new WebpackManifestPlugin({
            fileName: "manifest-client.json"
        }),
        new HtmlWebpackPlugin({
            templateContent:
                `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <div id="app"></div>
</body>
</html>`
        })
    ]
})
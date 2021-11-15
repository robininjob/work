const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");
module.exports = {
    // production, development
    mode: "production",
    entry: "./src/index.js",
    performance: {
        hints: false
    },
    module: {
        rules: []
    },
    resolve: {
        extensions: [".js"]
    },
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, "build")
    },
    devServer: {
        compress: true,
        port: 8060,
    },
    performance: {
        maxEntrypointSize: 1524288,
        maxAssetSize: 2097152
    },
    plugins: [
        new CopyPlugin({
            patterns: [
                { from: "src/index.html", to: "" },
                { from: "node_modules/scichart/_wasm/scichart2d.data", to: "" },
                { from: "node_modules/scichart/_wasm/scichart2d.wasm", to: "" }
            ]
        })
    ]
};
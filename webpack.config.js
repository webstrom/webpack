const ExtractTextPlugin = require("extract-text-webpack-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const baseConfig = require("./webpack.base.config.js");

baseConfig.mode = "production";
baseConfig.plugins.push(
    ...[
        // 压缩代码 生产模式会默认调用改插件
        new UglifyJsPlugin(),
        new ExtractTextPlugin('css/[name].css')
    ]
);
module.exports = baseConfig;
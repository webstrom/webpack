const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const baseConfig = require("./webpack.base.config.js");
const uglify = require('uglifyjs-webpack-plugin');
baseConfig.mode = "production";
//打包后输出文件的文件名
baseConfig.output.filename = "js/[name]_[hash].js";
baseConfig.plugins.push(
    ...[
        // 压缩代码 生产模式会默认调用该插件
        new UglifyJsPlugin(),
        new uglify(),
    ]
);
module.exports = baseConfig;
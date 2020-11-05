"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const webpack_1 = __importDefault(require("webpack"));
const html_webpack_plugin_1 = __importDefault(require("html-webpack-plugin"));
const path_1 = __importDefault(require("path"));
const clean_webpack_plugin_1 = require("clean-webpack-plugin");
const mini_css_extract_plugin_1 = __importDefault(require("mini-css-extract-plugin"));
const fork_ts_checker_webpack_plugin_1 = __importDefault(require("fork-ts-checker-webpack-plugin"));
const parse_config_1 = require("./parse.config");
const plugins = [];
// 如果是多入口，则需要添加plugin
const htmlWebpackPluginMinify = {
    removeComments: true,
    collapseInlineTagWhitespace: true,
    removeRedundantAttributes: true,
    useShortDoctype: true,
    minifyJS: true,
    minifyCSS: true,
    minifyURLs: true,
};
if (parse_config_1.configs.pages && Object.keys(parse_config_1.configs.pages).length > 0) {
    for (let pageKey in parse_config_1.configs.pages) {
        plugins.push(new html_webpack_plugin_1.default(Object.assign({ template: path_1.default.resolve(process.cwd(), 'public/index.html'), filename: `${pageKey}.html`, title: pageKey, chunks: [pageKey], minify: htmlWebpackPluginMinify }, parse_config_1.configs.pages[pageKey])));
    }
}
else {
    plugins.push(new html_webpack_plugin_1.default({
        template: path_1.default.resolve(process.cwd(), 'public/index.html'),
        favicon: parse_config_1.configs.favicon,
        filename: `index.html`,
        inject: true,
        minify: htmlWebpackPluginMinify,
    }));
}
if (process.env.NODE_ENV === 'development') {
    plugins.push(new webpack_1.default.HotModuleReplacementPlugin(), new fork_ts_checker_webpack_plugin_1.default({
        async: false,
        formatter: undefined,
    }));
}
else {
    plugins.push(new clean_webpack_plugin_1.CleanWebpackPlugin(), new mini_css_extract_plugin_1.default({
        filename: parse_config_1.configs.hash
            ? `${parse_config_1.configs.assetsDir}/css/[name].[contenthash:8].css`
            : `${parse_config_1.configs.assetsDir}/css/[name].css`,
        chunkFilename: parse_config_1.configs.hash
            ? `${parse_config_1.configs.assetsDir}/css/[name].[contenthash:8].chunk.css`
            : `${parse_config_1.configs.assetsDir}/css/[name].chunk.css`,
    }));
}
exports.default = plugins;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBableOptions = exports.getSassLoaderOptions = exports.getLessLoaderOptions = exports.getStyleLoaderOptions = exports.getPostLoaderOptions = exports.getCssloaderOptions = exports.getDevServer = exports.getDevtool = exports.getOutput = exports.getEntrys = exports.configs = void 0;
const path_1 = __importDefault(require("path"));
const lodash_1 = __importDefault(require("lodash"));
const fs_1 = __importDefault(require("fs"));
const default_config_1 = __importDefault(require("./default.config"));
const isProduction = process.env.NODE_ENV === "production";
const userConfigPath = path_1.default.resolve(process.cwd(), "config/config.js");
const rootSource = process.cwd();
// 处理配置文件不存的情况
const getConfigs = () => {
    if (!fs_1.default.existsSync(userConfigPath)) {
        return default_config_1.default;
    }
    // console.log('合并对象', lodash.merge(defaultConfig, require(userConfigPath)));
    return lodash_1.default.merge(default_config_1.default, require(userConfigPath));
};
exports.configs = getConfigs();
/**
 * @description 处理webpack 入口
 * @returns webpack.Entry
 */
const getEntrys = () => {
    console.log(process.cwd());
    const webpackHotMidlleClient = path_1.default.resolve(process.cwd(), "./node_modules/webpack-hot-middleware/client.js") + "?path=/__webpack_hmr&timeout=20000&quiet=true&overlayWarnings=true";
    // 如果是多页面配置
    if (!!exports.configs.pages && Object.keys(exports.configs.pages).length > 0) {
        const entryObject = {};
        for (let pageKey in exports.configs.pages) {
            entryObject[pageKey] = [
                !isProduction && exports.configs.pages[pageKey].entry,
                webpackHotMidlleClient,
            ].filter(Boolean);
        }
        return entryObject;
    }
    return [exports.configs.entry, !isProduction && webpackHotMidlleClient].filter(Boolean);
};
exports.getEntrys = getEntrys;
/**
 * @description 处理出口
 */
const getOutput = () => {
    if (!exports.configs.hash) {
        return {
            pathinfo: false,
            publicPath: exports.configs.publicPath,
            filename: `${exports.configs.assetsDir}/js/[name].js`,
            chunkFilename: `${exports.configs.assetsDir}/js/[name].chunk.js`,
            path: path_1.default.resolve(rootSource, exports.configs.outPutDir),
        };
    }
    return {
        publicPath: exports.configs.publicPath,
        pathinfo: false,
        filename: isProduction
            ? `${exports.configs.assetsDir}/js/[name].[chunkhash:8].js`
            : `${exports.configs.assetsDir}/js/[name].js`,
        chunkFilename: isProduction
            ? `${exports.configs.assetsDir}/js/[name].[chunkhash:8].chunk.js`
            : `${exports.configs.assetsDir}/js/[name].chunk.js`,
        path: path_1.default.resolve(rootSource, exports.configs.outPutDir),
    };
};
exports.getOutput = getOutput;
const getDevtool = () => {
    if (exports.configs.devtool) {
        return exports.configs.devtool;
    }
    return isProduction ? false : "eval-cheap-module-source-map";
};
exports.getDevtool = getDevtool;
/**
 * @description 获取webpack devServer的配置
 */
const getDevServer = () => {
    const defaultDevServer = {
        port: 8080,
        host: "127.0.0.1",
        proxy: {},
    };
    return Object.assign(Object.assign({}, defaultDevServer), exports.configs.devServer);
};
exports.getDevServer = getDevServer;
/**
 * @description 获取静态资源分析的配置
 */
const getAnalyze = () => {
    const defaultAnalyze = {};
    // 传递false,则代表不开启资源分析
    if (exports.configs.analyze === false) {
        return undefined;
    }
    // 传递true或者空对象则代表使用默认配置
    if (exports.configs.analyze === true || Object.keys(exports.configs.analyze).length === 0) {
        return defaultAnalyze;
    }
    if (!!exports.configs.analyze && Object.keys(exports.configs.analyze).length > 0) {
        return exports.configs.analyze;
    }
    return defaultAnalyze;
};
const getCssloaderOptions = () => {
    return Object.assign({}, exports.configs.cssLoader);
};
exports.getCssloaderOptions = getCssloaderOptions;
/**
 * @description post-loader 相关配置项
 */
const getPostLoaderOptions = () => {
    return Object.assign({ postcssOptions: {
            plugins: [
                [
                    require.resolve("postcss-preset-env"),
                    {
                        browsers: exports.configs.targets,
                        autoprefixer: Object.assign({}, exports.configs.autoprefixer),
                    },
                ],
                [require.resolve("postcss-normalize")],
                ...exports.configs.extraPostCSSPlugins,
            ],
        } }, exports.configs.postCssLoader);
};
exports.getPostLoaderOptions = getPostLoaderOptions;
const getStyleLoaderOptions = () => {
    return Object.assign({}, exports.configs.styleLoader);
};
exports.getStyleLoaderOptions = getStyleLoaderOptions;
const getLessLoaderOptions = () => {
    return Object.assign({}, exports.configs.lessLoader);
};
exports.getLessLoaderOptions = getLessLoaderOptions;
const getSassLoaderOptions = () => {
    return Object.assign({}, exports.configs.sassLoader);
};
exports.getSassLoaderOptions = getSassLoaderOptions;
/**
 * @description bable配置
 */
const getBableOptions = () => {
    return {
        presets: [
            [
                require("@babel/preset-env"),
                {
                    //  决定如何polyfill false 代表不导入，usage 按需导入 entry 入口导入
                    useBuiltIns: "usage",
                    modules: false,
                    targets: exports.configs.targets,
                    corejs: 3,
                },
            ],
            require("@babel/preset-typescript"),
            [
                require("@babel/preset-react"),
                {
                    runtime: "automatic",
                },
            ],
            ...exports.configs.extraBabelPresets,
        ],
        plugins: [
            require.resolve("@babel/plugin-transform-runtime"),
            ...exports.configs.extraBabelPlugins,
        ],
    };
};
exports.getBableOptions = getBableOptions;

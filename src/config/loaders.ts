import webpack from "webpack";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import {
  configs,
  getCssloaderOptions,
  getPostLoaderOptions,
  getLessLoaderOptions,
  getSassLoaderOptions,
  getStyleLoaderOptions,
  getBableOptions
} from "./parse.config";
const isDev = process.env.NODE_ENV === "development";
const isProduction = process.env.NODE_ENV === "production";

const cssRegex = /\.css$/;
const cssModuleRegex = /\.module\.css$/;
const lessRegex = /\.less$/;

const lessModuleRegex = /\.module\.less$/;
const sassRegex = /\.(scss|sass)$/;
const sassModuleRegex = /\.module\.(scss|sass)$/;

/**
 *
 * @param cssOptions
 * @param preProcessor
 * @description 处理样式loader
 */
const getStyleLoaders: (
  cssOptions?: any,
  preProcessor?: any
) => webpack.RuleSetRule[] = (cssOptions, preProcessor) => {
  const loaders: any = [
    isDev && {
      loader: require.resolve("style-loader"),
      options: {
        ...getStyleLoaderOptions()
      }
    },
    isProduction && MiniCssExtractPlugin.loader,
    {
      loader: require.resolve("css-loader"),
      options: cssOptions
    },
    {
      loader: require.resolve("postcss-loader"),
      options: getPostLoaderOptions()
    }
  ].filter(Boolean);
  if (preProcessor) {
    loaders.push(preProcessor);
  }
  return loaders;
};
const rules: webpack.ModuleOptions["rules"] = [
  // { test: /\.m?js/, type: 'javascript/auto' },
  {
    test: /\.(ts|js)x?$/,
    exclude: /(node_modules|bower_components)/,
    use: [
      {
        loader: require.resolve("babel-loader"),
        options: {
          cacheDirectory: isDev ? true : false,
          cacheCompression: false, //压缩
          compact: !isDev,
          ...getBableOptions()
        }
      }
      // {
      // 	loader: require.resolve('ts-loader'),
      // 	options: {
      // 		// 关闭类型检查只进行转移，将类型检查交给fork-ts-checker-webpack-plugin,在别的线程进城检查
      // 		transpileOnly: true,
      // 	},
      // },
    ]
  },
  //css 编译
  {
    test: cssRegex,
    use: getStyleLoaders({
      ...getCssloaderOptions()
    })
  },
  //less 编译
  {
    test: lessRegex,
    use: getStyleLoaders(
      {
        importLoaders: 2
      },
      {
        loader: "less-loader",
        options: getLessLoaderOptions()
      }
    )
  },
  //sass 编译
  {
    test: sassRegex,
    exclude: /(node_modules|bower_components)/,
    use: getStyleLoaders(
      {
        importLoaders: 2
      },
      {
        loader: "sass-loader",
        options: getSassLoaderOptions()
      }
    )
  },
  {
    test: /\.(png|jpg|gif|ico|svg)$/i,
    use: [
      {
        loader: require.resolve("url-loader"),
        options: {
          limit: configs.inlineLimit,
          name: `${configs.assetsDir}/media/imgs/[name].[hash:8].[ext]`
        }
      }
    ]
  },
  {
    test: /\.(woff|woff2|eot|ttf|otf|obj|gltf)$/,
    use: [
      {
        loader: require.resolve("url-loader"),
        options: {
          name: `${configs.assetsDir}/media/fonts/[name].[hash:8].[ext]`
        }
      }
    ]
  }
];
export default rules;

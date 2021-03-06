const path = require('path')

module.exports = {
  /**
   * @description 静态资源存放路径
   * @type string
   * @default "assest"
   */
  outPutDir: 'dist',
  publicPath: '/',
  assetsDir: 'assest',
  /**
   * @description 配置开发服务器
   *
   */
  devServer: {
    port: 8080, // 默认运行端口
    host: '127.0.0.1',
    proxy: {}, //转发方式
  },
  /**
   * @description 打包入口(如果同时配置了pages,则将忽略entry)
   * @type string
   * @default path.resolve(__dirname, '../src/index.tsx')
   */
  entry: path.resolve(__dirname, '../src/index.tsx'),
  /**
   * @description 多页面配置
   * @type object|undefind
   * @default {}
   *
   */
  pages: {
    // index: {
    //   // page 的入口
    //   entry: path.resolve(process.cwd(), 'src/index.tsx'),
    //   // 模板来源
    //   template: path.resolve(process.cwd(), 'config/index.html'),
    //   // 在 dist/index.html 的输出
    //   filename: 'index.html',
    //   // 当使用 title 选项时，
    //   // template 中的 title 标签需要是
    //   title: 'Index Page',
    //   // 在这个页面中包含的块，默认情况下会包含
    //   chunks: ['index'],
    // },
  },
  /**
   * @description 配置别名，对引用路径进行映射
   */
  alias: {},
  /**
   * @description 模块分析结构
   * @description 如果传递false,则代表不开启代码分析插件，true则代表启用默认配置
   * @description 如果传递对象则代表启用默认配置，也可自定义配置
   * @type Boolean| {}
   *
   */
  analyze: false,
  /**
   * @description 设置autoprefixer 配置项
   */
  autoprefixer: {},
  /**
   * @description cssloader 相关的配置
   */
  cssLoader: {},
  // less相关配置项
  lessLoader: {},
  // styleloader 相关配置项
  styleLoader: {},
  //sassloader 相关配置项
  sassLoader: {},
  /**
   * @description postloader 相关配置项
   *
   */
  postcssLoader: {},
  /**
   * @description 配置额外的postcss插件
   * @default []
   */
  extraPostCSSPlugins: [],
  //设置要复制到输出目录的文件或文件夹。
  copy: [],

  devtool: '',
  //设置哪些模块可以不被打包
  externals: {},
  //配置额外的babel打包插件
  extraBabelPlugins: [],
  //配置额外的babel预设
  extraBabelPresets: [],
  // 配置额外的webpack 插件
  extraPlugins: [],
  // 配置favicon 地址
  favicon: '',
  // 开启ts 编译时的类型检查，默认开启
  forkTSChecker: {},
  // 配置是否让生成的文件包含hash后缀
  hash: true,
  //配置图片文件是否走base64的编译的阈值
  inlineLimit: 10000, //10k
  targets: [],
}

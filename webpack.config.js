const isProd = process.env.NODE_ENV === 'production';
const sourceMap = isProd ? 'nosources-source-map' : 'eval-source-map';

const
  path = require('path'),
  webpack = require('webpack'),
  CleanWebpackPlugin = require('clean-webpack-plugin'),
  HtmlWebpackPlugin = require('html-webpack-plugin'),
  FaviconsWebpackPlugin = require('favicons-webpack-plugin');

const
  develop = 'src',
  production = 'dist';

const
  SRC_DIR = path.join(__dirname, develop),
  DIST_DIR = path.join(__dirname, production);

//============================================================
// Plugins
const cleanFolderProd = new CleanWebpackPlugin(production);

const commonsChunk = new webpack.optimize.CommonsChunkPlugin({
  name: ['index', 'vendor'],
});

const favicons = new FaviconsWebpackPlugin({
  logo: `./${develop}/favicon/logo.png`,
  prefix: 'favicon/',
  emitStats: false,
  inject: true,
  background: '#fff',
  icons: {
    android: true,
    appleIcon: true,
    appleStartup: true,
    coast: false,
    favicons: true,
    firefox: true,
    opengraph: false,
    twitter: false,
    yandex: false,
    windows: true,
  },
});

const htmlIndex = new HtmlWebpackPlugin({
  template: path.join(__dirname, develop, 'index.html'),
  inject: 'body',
  hash: true,
  filename: 'index.html',
  chunks: ['index', 'vendor'],
});

const uglifyJs = new webpack.optimize.UglifyJsPlugin({
  parallel: {cache: true, workers: 2},
  sourceMap: true,
});

const definePlugin = new webpack.DefinePlugin({
  'process.env': {NODE_ENV: JSON.stringify('production')},
});

//============================================================
// Configs
const htmlConfig = {
  loader: 'html-loader',
  options: {minimize: isProd},
};

const fontConfig = {
  loader: 'file-loader',
  options: {
    name: '[name].[ext]',
    outputPath: 'assets/fonts/',
  },
};

// Config img
const
  imgDev = {
    loader: 'file-loader',
    options: {
      name: '[name].[ext]',
      outputPath: 'assets/img/',
    },
  },
  imgProd = [
    imgDev,
    {
      loader: 'image-webpack-loader',
      options: {
        optipng: {optimizationLevel: 7},
        pngquant: {quality: '65-90', speed: 4},
        mozjpeg: {progressive: true, quality: 65},
      },
    },
  ],
  imgConfig = isProd ? imgProd : imgDev;
//============================================================
// WebPack
const config = {
  devtool: sourceMap,

  entry: {
    vendor: ['react', 'react-dom'],
    index: SRC_DIR + '/index',
  },

  output: {
    path: DIST_DIR + '/',
    filename: 'js/[name].[chunkhash].bundle.js',
    sourceMapFilename: '[file].map',
   // publicPath: '/',
  },

  module: {
    rules: [
      // html-loader
      {
        include: SRC_DIR,
        test: /\.html$/,
        use: htmlConfig,
      },
      // babel-loader
      {
        include: [
          path.resolve(__dirname, `${develop}`),
        ],
        test: /\.(js|jsx)$/,
        use: 'babel-loader',
      },
      // img via file-loader
      // TODO  include: path.resolve(__dirname, `${develop}/assets/img/`),
      {
        include: path.resolve(__dirname, `${develop}`),
        test: /\.(jpg|png)$/,
        use: imgConfig,
      },
      // fonts via file-loader
      {
        include: path.resolve(__dirname, `${develop}/assets/fonts/`),
        test: /\.(woff|woff2|svg)$/,
        use: fontConfig,
      },
      // TODO: move all css to styled-components
      {
        include: path.resolve(__dirname, `${develop}/old-css-support/css/`),
        test:/\.css$/,
        use:['style-loader','css-loader']
      }
    ],
  },

  devServer: {
    port: 3000,
    open: true,
    inline: true,
    historyApiFallback: true,
  },

  // shortcuts
  resolve: {
    alias: {
      'root': path.resolve(__dirname, develop),
    },
  },

  plugins: isProd ? [
    cleanFolderProd,
    commonsChunk,
    definePlugin,
    favicons,
    htmlIndex,
    uglifyJs,
  ] : [
    commonsChunk,
    htmlIndex,
  ],
};
module.exports = config;
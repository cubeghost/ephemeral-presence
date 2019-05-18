require('dotenv').config();

const path = require('path');
const webpack = require('webpack');
const findCacheDir = require('find-cache-dir');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const WebpackCleanPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const del = require('rimraf');

const PROD = process.env.NODE_ENV === 'production';

const paths = {
  appBuild: path.resolve(__dirname, './build'),
  appHtml: path.resolve(__dirname, './src/index.html'),
  appPackageJson: path.resolve(__dirname, './package.json'),
  appSrc: path.resolve(__dirname, './src'),
  appNodeModules: path.resolve(__dirname, './node_modules'),
};

class CompilePlugin {
  constructor(fn) {
    this.fn = fn
  }

  apply(compiler) {
    const handler = stats => {
      if (typeof this.fn === 'function') {
        this.fn(compiler, stats)
      }
    }

    if (compiler.hooks) {
      compiler.hooks.compilation.tap('compile-webpack-plugin', handler)
    }
  }
}

const config = {
  mode: 'development',
  devtool: 'cheap-module-eval-source-map',
  entry: {
    client: path.join(paths.appSrc, 'client.js')
  },
  output: {
    path: paths.appBuild,
    pathinfo: true,
    filename: '[name].[hash:8].js',
    sourceMapFilename: '[name].[hash:8].js.map',
    publicPath: '/',
  },
  resolve: {
    modules: [paths.appSrc, paths.appNodeModules],
    extensions: ['.js', '.jsx', '.json'],
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        enforce: 'pre',
        exclude: [/node_modules/],
        include: [paths.appSrc],
        use: 'eslint-loader',
      },
      {
        test: /\.jsx?$/,
        include: [paths.appSrc],
        use: 'babel-loader',
      },
      {
        test: /\.css$/,
        include: [paths.appSrc],
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          'css-loader'
        ]
      }
    ],
  },
  optimization: {
    namedModules: true,
    concatenateModules: true,
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css',
    }),
    new HtmlWebpackPlugin({
      inject: true,
      template: paths.appHtml,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true,
      },
    }),
    new webpack.EnvironmentPlugin([
      'NODE_ENV', 
      'PROJECT_ID',
      'DEBUG'
    ]),
    new FriendlyErrorsWebpackPlugin(),
    new CaseSensitivePathsPlugin(),
    new WebpackCleanPlugin([
      `${paths.appBuild}/client.*.js`,
      `${paths.appBuild}/vendor.*.js`,
    ]),
    new CompilePlugin((compilation) => {
      // delete all client bundles except the new one
      // helps save disk space on glitch
      // this doesnt work wtf
      console.log('compile ', compilation.hash)
      del([
        'build/client*.js',
        `!build/client.${compilation.hash.slice(0, 8)}.js`
      ]).then(res => {
        console.log(res)
      });
    })
  ]
};

if (process.env.NODE_ENV === 'production') {
  config.mode = 'production';
  config.devtool = 'source-map';
  config.optimization = {
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
      },
    },
  };

  config.plugins.push(
    new TerserPlugin({
      parallel: true,
      terserOptions: {
        ecma: 6,
      },
    }),
  );
}

module.exports = config;

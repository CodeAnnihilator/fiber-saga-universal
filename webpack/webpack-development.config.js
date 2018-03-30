import path from 'path'
import webpack from 'webpack'
import chalk from 'chalk'
import WebpackIsomorphicToolsPlugin from 'webpack-isomorphic-tools/plugin'
import ProgressBarPlugin from 'progress-bar-webpack-plugin'

import config from '../config/app.config'
import babelLoaderQuery from '../config/dev.babel'
import isomorphicConfig from './webpack-isomorphic-tools'

const host = config.host
const port = parseInt(config.port, 10) + 1
const assetsPath = path.resolve(__dirname, '../static/dist')
const webpackIsomorphicToolsPlugin = new WebpackIsomorphicToolsPlugin(isomorphicConfig)

export default {
  devtool: 'inline-source-map',
  context: path.resolve(__dirname, '..'),
  mode: 'development',
  entry: {
    'main': [
      'webpack-hot-middleware/client?path=http://' + host + ':' + port + '/__webpack_hmr',
      './src/render/client.js'
    ]
  },
  output: {
    path: assetsPath,
    filename: '[name]-[hash].js',
    chunkFilename: '[name]-[chunkhash].js',
    publicPath: 'http://' + host + ':' + port + '/dist/'
  },
  module: {
    rules: [
      { test: /\.jsx?$/, exclude: /node_modules/, loaders: [`babel-loader?${babelLoaderQuery}`]}
      // { test: /\.jsx?$/, exclude: /node_modules/, loaders: [`babel-loader?${babelLoaderQuery}`, 'eslint-loader']}
    ]
  },
  resolve: {
    extensions: ['.json', '.js', '.jsx']
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.IgnorePlugin(/webpack-stats\.json$/),
    new ProgressBarPlugin({
      format: '  build [:bar] ' + chalk.green.bold(':percent') + ' (:elapsed seconds)',
      clear: false,
      complete: '+'
    }),
    webpackIsomorphicToolsPlugin.development()
  ]
}

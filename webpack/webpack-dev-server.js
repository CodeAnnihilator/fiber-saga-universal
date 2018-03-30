import Express from 'express'
import webpack from 'webpack'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'

import config from '../config/app.config'
import webpackConfig from './webpack-development.config'

const compiler = webpack(webpackConfig)
const host = config.host
const port = parseInt(config.port, 10) + 1

const serverOptions = {
  contentBase: `http://${host}:${port}`,
  quiet: true,
  noInfo: true,
  hot: true,
  inline: true,
  lazy: false,
  publicPath: webpackConfig.output.publicPath,
  headers: { 'Access-Control-Allow-Origin': '*' },
  stats: 'minimal'
}

const app = new Express()

app.use(webpackDevMiddleware(compiler, serverOptions))
app.use(webpackHotMiddleware(compiler))

app.listen(port, err => console.error(err))

require('../config/server.babel')

const path = require('path')
const rootDir = path.resolve(__dirname, '..')

const WebpackIsomorphicTools = require('webpack-isomorphic-tools')
const isomorphicConfig = require('../webpack/webpack-isomorphic-tools')

global.webpackIsomorphicTools = new WebpackIsomorphicTools(isomorphicConfig)
  .server(rootDir, function() {
    require('../src/render/server')
  })

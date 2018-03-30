import fs from 'fs'

const babelrc = fs.readFileSync('./.babelrc')
let babelrcObject = {}

try {
  babelrcObject = JSON.parse(babelrc)
} catch (err) {
  console.error('error parsing babelrc')
  console.error(err)
}

const babelrcObjectDevelopment = babelrcObject.env && babelrcObject.env.development || {}
let combinedPlugins = babelrcObject.plugins || []
combinedPlugins = combinedPlugins.concat(babelrcObjectDevelopment.plugins)
let babelLoaderQuery = Object.assign({}, babelrcObjectDevelopment, babelrcObject, { plugins: combinedPlugins })
delete babelLoaderQuery.env

babelLoaderQuery.plugins = babelLoaderQuery.plugins || []
let reactTransform = babelLoaderQuery.plugins.find(plugin => Array.isArray(plugin) && plugin[0] === 'react-transform') || null

if (!reactTransform) {
  reactTransform = ['react-transform', { transforms: [] }]
  babelLoaderQuery.plugins.push(reactTransform)
}

if (!reactTransform[1] || !reactTransform[1].transforms) {
  reactTransform[1] = Object.assign({}, reactTransform[1], { transforms: [] })
}

reactTransform[1].transforms.push({
  transform: 'react-transform-hmr',
  imports: ['react'],
  locals: ['module']
})

export default JSON.stringify(babelLoaderQuery)

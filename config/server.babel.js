const fs = require('fs')

const babelrc = fs.readFileSync('./.babelrc')
let config

try {
  config = JSON.parse(babelrc)
} catch (err) {
  console.log('error parsing .babelrc')
  console.log(err)
}

require('babel-register')(config)

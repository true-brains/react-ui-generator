'use strinc'

const path = require('path')
const fs = require('fs')

const appDirectory = fs.realpathSync(process.cwd())
const resolve = relativePath => path.resolve(appDirectory, relativePath)

module.exports = {
  root: resolve(''),
  src: resolve('src'),
  tests: resolve('__tests__'),
  tsConfig: resolve('tsconfig.json'),
}

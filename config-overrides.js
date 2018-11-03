const { injectBabelPlugin } = require('react-app-rewired')
const rewireSass = require('react-app-rewire-sass-modules');
module.exports = function override(config, env) {
  // 这里是自己的webpack配置
  config = injectBabelPlugin(
    ['import', { libraryName: 'antd', libraryDirectory: 'es', style: 'css' }],
    config
  )
  config = rewireSass(config, env)
  return config
}
const path = require('path')
const { ROOT_DIR } = require('../config/global')
const fs = require('fs-extra')
const filepath = path.join(ROOT_DIR, 'config', 'setting.json')

module.exports = {
  /**
   * @func 读取json配置
   * @param {*} 回调
   * @param {*} field 传入要读取的key 
   */
  '$setting.get': function (done, {field}) {
    try {
      let config = fs.read(filepath, 'json')
      let result = config[ field ]
      if (field.constructor === Array ) {
        result = {}
        field.map(item => {
          result[ item ] = config[ item ]
        })
      }
      return done(response(result))
    } catch (reason) {
      console.log(`配置读取失败：${ reason }`)
      return done(response(500, '配置读取失败'))
    }
  },
  /**
   * @func 设置配置
   * @param {*} 回调
   * @param {*} field 传入要保存的设置
   */
  '$setting.set': function (done, {setting}) {
    try {
      let config = fs.read(filepath, 'json')
      fs.write(filepath, {
        ...config,
        ...setting
      })
      return done(response(200))
    } catch (reason) {
      console.log(`配置保存失败：${ reason }`)
      return done(response(500, '配置保存失败'))
    }
  }
}
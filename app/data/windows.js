
/**
 * 这里是窗口相关的功能
 */
const { dialog, BrowserWindow} = require('electron')
const response = require('../utils/response')
module.exports = {
  /**
   * @func 打开文件目录
   * @param {Function} done 回调
   * @return {Object}
   */
  '$window.dialog': (done) => {
    dialog.showOpenDialog({
      properties: ['openFile', 'openDirectory']
    }, (files) => {
      if (files) {
        return done(response(files.pop() || '', 200, '打开文件目录成功'))
      }
    })
  },
  /**
   * @func 窗口最小化
   * @param {Function} done 回调
   * @return {Object}
   */
  '$window.min': (done) => {
    BrowserWindow.getFocusedWindow().minimize()
    return done(response(200, '最小化完成'))
  },
  /**
   * @func 窗口最大化
   * @param {Function} done 回调
   * @return {Object}
   */
  '$window.max': (done) => {
    let mainWindow = BrowserWindow.getFocusedWindow()
    if (mainWindow.isMaximized()) {
      mainWindow.restore()
    } else {
      mainWindow.maximize()
    }
    return done(response(200, '最大化完成'))
  },
  /**
   * @func 关闭窗口
   * @param {Function} done 回调
   * @return {Object}
   */
  '$window.close': (done) => {
    BrowserWindow.getFocusedWindow().close()
    return done(response(200, '关闭完成'))
  },
  /**
   * @func 刷新
   * @param {Function} done 回调
   * @return {Object}
   */
  '$window.refresh': (done) => {
    BrowserWindow.getFocusedWindow().reload()
    return done(response(200, '刷新完成'))
  }
}
/**
 * @func 封装了创建窗口的方法
 * @param {Number} width 窗口的宽
 * @param {Number} height 窗口的高
 * @param {String} key 窗口的路径
 * @param {Function} callback 回调
 * @return {Object} 窗口对象
 */
const { BrowserWindow, Menu} = require('electron')
const path = require('path')
const pkg = require('../../package.json')
const url = require('url')
module.exports = (width, height, key, callback) => {

  // 创建浏览器窗口
  let win = new BrowserWindow({
    width,
    height,
    useContentSize: true,
    frame: false,
    show: false,
    webPreferences: {
      javascript: true,
      plugins: true,
      nodeIntegration: false, // 不集成 Nodejs
      webSecurity: false,
      preload: path.join(__dirname, '../../public/renderer.js') // 但预加载的 js 文件内仍可以使用 Nodejs 的 API
    }
  })
  // 然后加载应用的 index.html 
  if (pkg.DEV) {
    win.loadURL(`http://localhost:3000/#/${key}`)
  } else {
    win.loadURL(url.format({
      pathname: path.join(__dirname, `./build/${key}.html`),
      protocol: 'file:',
      slashes: true
    }))
  }
  // 打开开发者工具。 
  // win.webContents.openDevTools()
  // 窗口关闭事件
  win.on('closed', () => {
    win = null
  })
  // 窗口就绪 
  win.once('ready-to-show', () => {
    win.show()
    win.focus()
  })
  Menu.setApplicationMenu(null)
  // 安装react开发工具
  // BrowserWindow.addDevToolsExtension('E:/hexo-blog-client/react-dev-tools/3.4.2_0')
  return win
}
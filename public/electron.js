const { app, ipcMain } = require('electron')
const create = require('./utils/create.js')
const windows = require('./data/windows.js')
const article = require('./data/article.js')
const registry = require('./utils/registry.js')
// 保持一个对于 window 对象的全局引用，如果你不这样做， 
// 当 JavaScript 对象被垃圾回收， window 会被自动地关闭 
let win
// Electron 会在初始化后并准备 
// 创建浏览器窗口时，调用这个函数。

function createWindow () {
  win = create(1080, 650, 'home')
  win.webContents.openDevTools()
  registry(windows)
  registry(article)
  // 新窗口打开配置页面
  ipcMain.on('open-config', () => {
    win.hide()
    let child = create(400, 320, 'config')
    // 窗口就绪 
    child.once('close', () => {
      child = null
      win.show()
    })
  })
}
// 部分 API 在 ready 事件触发后才能使用。 
app.on('ready', () => {
  createWindow()
})
// 当全部窗口关闭时退出。 
app.on('window-all-closed', () => {
  // 在 macOS 上，除非用户用 Cmd + Q 确定地退出， 
  // 否则绝大部分应用及其菜单栏会保持激活。 
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
app.on('activate', () => {
  // 在macOS上，当单击dock图标并且没有其他窗口打开时， 
  // 通常在应用程序中重新创建一个窗口。 
  if (win === null) {
    createWindow()
  }
})

const { dialog, ipcMain} = require('electron')
const create = require('./create.js')
module.exports =  (mainWindow) => {

  // 打开文件目录
  ipcMain.on('open-file-dialog', (event) => {
    console.log('调用了open-file-dialog')
    dialog.showOpenDialog({
      properties: ['openFile', 'openDirectory']
    }, (files) => {
      if (files) {
        event.sender.send('selected-directory', files)
      }
    })
  })

  // 登录窗口最小化
  ipcMain.on('window-min', () => {
    mainWindow.minimize()
  })
  // 登录窗口最大化
  ipcMain.on('window-max', () => {
    if (mainWindow.isMaximized()) {
      mainWindow.restore()
    } else {
      mainWindow.maximize()
    }
  })
  // 关闭窗口
  ipcMain.on('window-close', () => {
    mainWindow.close()
  })
  // 刷新页面
  ipcMain.on('window-refresh', () => {
    mainWindow.reload()
  })
}
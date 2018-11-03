const { ipcMain, BrowserWindow } = require('electron')

function send(channel, ...args) {
  let currentWindow = BrowserWindow.getFocusedWindow()
  if (!currentWindow ) {
    currentWindow = BrowserWindow.getAllWindows()
    currentWindow = currentWindow && currentWindow.length && currentWindow[0]
  }
  currentWindow && currentWindow.webContents.send(channel, ...args)
}

function execute(key, target) {
  ipcMain.on(key, ({sender}, args, uuid) => {
    const callback = (result) => {
      if (typeof(sender.send) === 'function') {
        return sender.send(`${key}-${uuid}`, result)
      }
      return send(`${key}-${uuid}`, result)
    }
    target[key].call(target, callback, args)
  })
}

module.exports = (target) => {
  let keys = Object.keys(target)

  keys.map( key => {
    /^\$/.test(key) && execute(key, target)
  })
}
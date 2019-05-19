'use strict'

import { app, BrowserWindow, Menu, protocol, ipcMain, Tray, shell, screen  } from 'electron'
import { createProtocol } from 'vue-cli-plugin-electron-builder/lib'
import path from 'path'
import Config from './config'
const blogUrl = Config.get('url')

const isDevelopment = process.env.NODE_ENV !== 'production'

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win
let tray

// Standard scheme must be registered before the app is ready
protocol.registerStandardSchemes(['app'], {secure: true})


// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q

  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// 激活页面
app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow()
    if (process.platform === 'darwin') {
      initDockMenu()
    } else {
      initTrayIcon()
    }
  } else {
    win.show()
  }
})

// 打开控制台
ipcMain.on('openDevTool', () => {
  BrowserWindow.getFocusedWindow().webContents.openDevTools()
})

// 屏幕最小化
ipcMain.on('window.min', () => {
  BrowserWindow.getFocusedWindow().minimize()
})

// 屏幕最大化
ipcMain.on('window.max', () => {
  let mainWindow = BrowserWindow.getFocusedWindow()
  if (mainWindow.isMaximized()) {
    mainWindow.restore()
  } else {
    mainWindow.maximize()
  }
})

// 关闭屏幕
ipcMain.on('window.close', () => {
  BrowserWindow.getFocusedWindow().hide()
})

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', async () => {
  if (isDevelopment && !process.env.IS_TEST) {
    // Install Vue Devtools
    try {
      BrowserWindow.addDevToolsExtension(path.join(__dirname, '../tools/vue_devtools_4.1.5_0'))
    } catch (e) {
      /* eslint-disable-next-line */
      console.log(e)
    }
  }
  createWindow()
  if (process.platform === 'darwin') {
    initDockMenu()
  } else {
    initTrayIcon()
  }
})

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
  if (process.platform === 'win32') {
    process.on('message', data => {
      if (data === 'graceful-exit') {
        app.quit()
      }
    })
  } else {
    process.on('SIGTERM', () => {
      app.quit()
    })
  }
}

// 创建窗口
function createWindow () {
  // Create the browser window.
  win = new BrowserWindow({
    show: false,
    useContentSize: true,
    width: 965,
    height: 650,
    frame: false,
    icon: path.join(__static, 'icons/icon.png')
  })
  
  // win.maximize()

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // Load the url of the dev server if in development mode
    win.loadURL(process.env.WEBPACK_DEV_SERVER_URL)
    // if (!process.env.IS_TEST) win.webContents.openDevTools()
  } else {
    createProtocol('app')
    // Load the index.html when not in development
    win.loadURL('app://./index.html')
  }

  win.on('closed', () => {
    win = null
  })

  /**
   * 窗口加载完之后显示
   */
  win.once('ready-to-show', () => {
    win.show()
  })

  Menu.setApplicationMenu(null)

  if (process.platform !== 'darwin') {
    app.dock && app.dock.hide()
  } else {
    const menu = Menu.buildFromTemplate(getMacMenu())
    Menu.setApplicationMenu(menu)
  }
}

// 创建通知栏图标
function initTrayIcon () {
  /* eslint-disable-next-line */
  tray = new Tray(getNoMessageTrayIcon())
  const trayContextMenu = Menu.buildFromTemplate(getTrayDockMenu())
  tray.setToolTip('Hexo客户端')  
  tray.setContextMenu(trayContextMenu)

  tray.on('click', () => {
    console.log(1)
    if (win.isVisible() && !win.isMinimized()) {
      win.hide()
    } else {
      win.show()
    }
  })
  tray.on('right-click', () => {
    console.log(2)
    tray.popUpContextMenu(trayContextMenu)
  })
}

// 创建docker菜单
function initDockMenu () {
  const dockMenu = Menu.buildFromTemplate(getTrayDockMenu())
  app.dock.setMenu(dockMenu)
}

// 获取Mac的Menu菜单
function getMacMenu () {
  return [
    {
      label: 'HexoBlogClient',
      submenu: [
        { label: '关于HexoBlogClient', role: 'about' },
        { type: 'separator' },
        { label: '服务', role: 'services' },
        { type: 'separator' },
        { label: '隐藏HexoBlogClient', role: 'hide' },
        { label: '隐藏其他', role: 'hideothers' },
        { label: '全部显示', role: 'unhide' },
        { type: 'separator' },
        { label: '退出HexoBlogClient', role: 'quit' }
      ]
    },
    {
      label: '编辑',
      submenu: [
        { label: '撤销', role: 'undo' },
        { label: '恢复', role: 'redo' },
        { type: 'separator' },
        { label: '剪切', role: 'cut' },
        { label: '复制', role: 'copy' },
        { label: '粘贴', role: 'paste' },
        { label: '粘贴并匹配样式', role: 'pasteandmatchstyle' },
        { label: '删除', role: 'delete' },
        { label: '全选', role: 'selectall' }
      ]
    },
    {
      label: '窗口',
      submenu: [
        { label: '最小化', role: 'minimize' },
        { label: '重载', role: 'reload' },
        { label: '关闭', role: 'close' },
        { label: '退出', role: 'quit' }
      ]
    },
    {
      label: '帮助',
      submenu: [
        // { label: '关于', role: 'about' },
        { label: '检查更新', click: () => { checkVersion() } }
      ]
    }
  ]
}

// 获取Tary和Dock下的menu
function getTrayDockMenu () {
  return [
    {
      label: '显示主窗口',
      click: () => {
        win.show()
      }
    },
    {
      label: '打开博客',
      click: () => {
        if (blogUrl) {
          shell.openExternal(blogUrl)
        } else {
          win.webContents.send('jumping', 'settings')
        }
        win.show()
      }
    },
    {
      label: '设置',
      click: () => {
        win.webContents.send('jumping', 'settings')
        win.show()
      }
    },
    {
      label: '检查更新',
      click: () => { checkVersion()}
    },
    {
      label: '退出',
      click: () => {
        app.quit()
      }
    }
  ] 
}

// 统一获取任务栏图标
function getNoMessageTrayIcon () {
  if (process.platform === 'darwin') {
    return path.join(__static, 'icons/16x16.png')
  } else if (process.platform === 'win32') {
    return path.join(__static, 'icons/64x64.png')
  } else if (screen.getPrimaryDisplay().scaleFactor > 1) {
    return path.join(__static, 'icons/64x64.png')
  } else {
    return path.join(__static, 'icons/24x24.png')
  }
}

//检测更新
function checkVersion () {
  win.webContents.send('jumping', 'checkVersion')
}

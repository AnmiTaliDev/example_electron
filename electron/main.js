// SPDX-FileCopyrightText: AnmiTaliDev <anmitalidev@nuros.org>
const { app, BrowserWindow, Menu, ipcMain, dialog } = require('electron')
const path = require('path')
const fs = require('fs')

const isDev = !app.isPackaged

let win

function createWindow() {
  win = new BrowserWindow({
    width: 1200,
    height: 800,
    minWidth: 600,
    minHeight: 400,
    title: 'Markdown Editor',
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
    },
  })

  if (isDev) {
    win.loadURL('http://localhost:5173')
  } else {
    win.loadFile(path.join(__dirname, '../dist/index.html'))
  }

  buildMenu()
}

function buildMenu() {
  const template = [
    {
      label: 'Файл',
      submenu: [
        {
          label: 'Открыть',
          accelerator: 'CmdOrCtrl+O',
          click: handleOpen,
        },
        {
          label: 'Сохранить',
          accelerator: 'CmdOrCtrl+S',
          click: () => win.webContents.send('save-requested', 'save'),
        },
        {
          label: 'Сохранить как',
          accelerator: 'CmdOrCtrl+Shift+S',
          click: () => win.webContents.send('save-requested', 'save-as'),
        },
        { type: 'separator' },
        { role: 'quit', label: 'Выход' },
      ],
    },
    {
      label: 'Правка',
      submenu: [
        { role: 'undo', label: 'Отменить' },
        { role: 'redo', label: 'Повторить' },
        { type: 'separator' },
        { role: 'cut', label: 'Вырезать' },
        { role: 'copy', label: 'Копировать' },
        { role: 'paste', label: 'Вставить' },
        { role: 'selectAll', label: 'Выделить всё' },
      ],
    },
    {
      label: 'Вид',
      submenu: [
        {
          label: 'Переключить тему',
          click: () => win.webContents.send('toggle-theme'),
        },
        { type: 'separator' },
        { role: 'reload', label: 'Перезагрузить' },
        { role: 'toggleDevTools', label: 'Инструменты разработчика' },
        { type: 'separator' },
        { role: 'togglefullscreen', label: 'Полный экран' },
      ],
    },
  ]

  Menu.setApplicationMenu(Menu.buildFromTemplate(template))
}

async function handleOpen() {
  const result = await dialog.showOpenDialog(win, {
    filters: [
      { name: 'Markdown', extensions: ['md', 'markdown', 'txt'] },
      { name: 'Все файлы', extensions: ['*'] },
    ],
    properties: ['openFile'],
  })

  if (result.canceled || result.filePaths.length === 0) return

  const filePath = result.filePaths[0]
  const content = fs.readFileSync(filePath, 'utf-8')
  win.webContents.send('file-opened', { content, filePath })
}

ipcMain.handle('save-file', async (event, { content, filePath }) => {
  try {
    fs.writeFileSync(filePath, content, 'utf-8')
    return { success: true, filePath }
  } catch (err) {
    return { success: false, error: err.message }
  }
})

ipcMain.handle('save-file-as', async (event, { content }) => {
  const result = await dialog.showSaveDialog(win, {
    filters: [
      { name: 'Markdown', extensions: ['md'] },
      { name: 'Текстовый файл', extensions: ['txt'] },
      { name: 'Все файлы', extensions: ['*'] },
    ],
  })

  if (result.canceled || !result.filePath) return { success: false }

  try {
    fs.writeFileSync(result.filePath, content, 'utf-8')
    return { success: true, filePath: result.filePath }
  } catch (err) {
    return { success: false, error: err.message }
  }
})

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow()
})

// SPDX-FileCopyrightText: AnmiTaliDev <anmitalidev@nuros.org>
const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('api', {
  onFileOpened: (callback) => {
    ipcRenderer.on('file-opened', (event, data) => callback(data))
  },
  onSaveRequested: (callback) => {
    ipcRenderer.on('save-requested', (event, mode) => callback(mode))
  },
  onToggleTheme: (callback) => {
    ipcRenderer.on('toggle-theme', () => callback())
  },
  saveFile: (content, filePath) => {
    return ipcRenderer.invoke('save-file', { content, filePath })
  },
  saveFileAs: (content) => {
    return ipcRenderer.invoke('save-file-as', { content })
  },
  removeAllListeners: (channel) => {
    ipcRenderer.removeAllListeners(channel)
  },
})

const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
  recognize: (path) => ipcRenderer.invoke('recognize', path)
})

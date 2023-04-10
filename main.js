const { app, BrowserWindow, ipcMain } = require('electron')
const { join } = require('path')
const { createWorker } = require('tesseract.js')

const recognize = async (event, path) => {
  const worker = await createWorker({
    cachePath: join(__dirname, '/lang-data'),
    logger: (m) => console.log(JSON.stringify(m)),
    errorHandler: (e) => console.log(JSON.stringify(e))
  })
  await worker.loadLanguage('eng')
  await worker.initialize('eng')
  const result = await worker.recognize(path)
  await worker.terminate()
  
  console.log("image path:")
  console.log(path)
  console.log("recognize text:")
  console.log(result?.data?.text)

  return JSON.stringify(result)
}

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win

function createWindow () {
  // Create the browser window.
  win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: join(__dirname, "./preload.js"),
      nodeIntegration: true
    }
  })

  // and load the index.html of the app.
  win.loadFile('index.html')

  // Open the DevTools.
  win.webContents.openDevTools()

  // Emitted when the window is closed.
  win.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = null
  })
}

app.whenReady().then(() => {
  ipcMain.handle('recognize', recognize)

  createWindow()

  app.on("activate", function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

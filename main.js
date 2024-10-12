const { BrowserWindow, app, ipcMain } = require('electron');

let win;
function createWindow() {
    win = new BrowserWindow({
        height: 600,
        width: 1020,
        frame: false,//tira o nav bar padrao 
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        }
    })
    win.setMenuBarVisibility(false) //esconde os file, view e etc 
    win.loadFile("index.html")
    win.on("closed", () => {
        win = null
    })
}

let windowMaximized=false; // // 600x1020 (não maximizado) por padrão
ipcMain.on("manualClose", () => {
  app.quit();
});
ipcMain.on("manualMinimize", () => {
  win.minimize();
});
ipcMain.on("manualMaximize", () => {
  if (windowMaximized) {
    win.unmaximize();
  } else {
    win.maximize();
  }
  windowMaximized=!windowMaximized; // // inverte o valor de "windowMaximized"
});

app.on("ready", createWindow)

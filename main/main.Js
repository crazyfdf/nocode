const { app, BrowserWindow } = require('electron');
const isDev = require('electron-is-dev');
const Store = require('electron-store');
// const menuTemp = require('./src/temp/menuTemp');
const setIpc = require('./ipc/index.js');

Store.initRenderer();

let mainWindow;

app.on('ready', () => {
  mainWindow = new BrowserWindow({
    width: 1024,
    height: 768,
    minWidth: 600,
    minHeight: 500,
    frame: false,
    show: false,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true,
    },
  });

  const urlLocation = isDev ? 'http://localhost:3000' : process.env.baseURL;
  mainWindow.on('ready-to-show', () => {
    mainWindow.show();
  });
  mainWindow.loadURL(urlLocation);
  // 添加自定义的原生菜单
  // const menu = Menu.buildFromTemplate(menuTemp);
  // Menu.setApplicationMenu(menu);
  setIpc(mainWindow);
});
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

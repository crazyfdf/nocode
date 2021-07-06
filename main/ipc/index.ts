const { ipcMain } = require('electron');

module.exports = function (mainWindow, appUpdater) {
  ipcMain.on('pageMessage', (event, data) => {
    console.log('-----------------------');
    console.log('页面发送了消息：');
    console.log(data);
    console.log('-----------------------');
  });
  ipcMain.on('minimize', () => mainWindow.minimize());
  ipcMain.on('maximize', () => {
    // 判断窗口是否已经最大化
    if (mainWindow.isMaximized) {
      // 窗口还原
      mainWindow.restore();
    } else {
      // 最大化
      mainWindow.maximize();
    }
  });
  ipcMain.on('close', () => {
    // mainWindow = null; // 主窗口设置为null防止内存溢出
    console.log(mainWindow);

    mainWindow.exit(); // 直接退出应用程序
  });

  // ipcMain.on('appUpdater', (event, data) => {
  //   if (data === 'check') {
  //     appUpdater.checkForUpdates();
  //   }
  // });
};
export {};

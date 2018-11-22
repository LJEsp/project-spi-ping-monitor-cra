const electron = require("electron");
// Module to control application life.
const { app, BrowserWindow, ipcMain } = electron;
const ping = require("ping");

const path = require("path");
const url = require("url");

const startUrl =
  process.env.ELECTRON_START_URL ||
  url.format({
    pathname: path.join(__dirname, "/../build/index.html"),
    protocol: "file",
    slashes: true
  });

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    minWidth: 1400,
    minHeight: 800,

    webPreferences: { backgroundThrottling: false }
  });

  // and load the index.html of the app.
  mainWindow.loadURL(startUrl);

  // Open the DevTools.
  // mainWindow.webContents.openDevTools();

  // Emitted when the window is closed.
  mainWindow.on("closed", function() {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", createWindow);

// Quit when all windows are closed.
app.on("window-all-closed", function() {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", function() {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

ipcMain.on("host:request", (event, host) => {
  const pingData = {};
  pingData.host = host;

  ping.promise.probe(host, { timeout: 10 }).then(res => {
    // pingData.isAlive = res.alive;
    // pingData.time = res.time;
    // pingData.numeric_host = res.numeric_host;

    if (res.alive) {
      pingData.status = "Up";
    } else if (res.time === "unknown" && res.numeric_host !== "oul") {
      pingData.status = "Timed out";
    } else if (res.numeric_host === "oul") {
      pingData.status = "Not found";
    }

    if (res.time === "unknown") {
      pingData.time = "- ";
    } else if (res.time) {
      pingData.time = `${res.time} ms`;
    }

    if (res.numeric_host === "oul") {
      pingData.ip = "- ";
    } else {
      pingData.ip = res.numeric_host;
    }

    mainWindow.webContents.send(`host:${host}`, pingData);
  });
});

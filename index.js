const electron = require("electron");
const ffmpeg = require("fluent-ffmpeg");

const { app, BrowserWindow, ipcMain } = electron;

app.on("ready", () => {
  console.log("App is ready");

  const mainWindow = new BrowserWindow({
    width: 1000,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true,
    },
    backgroundColor: "#ccc",
  });

  console.log("__dirname", __dirname);
  mainWindow.loadURL(`file://${__dirname}/index.html`);
});

ipcMain.on("video:submit", (event, path) => {
  console.log("path", path);
  ffmpeg.ffprobe(path, (err, metaData) => {
    if (err) {
      console.log("error", err);
    }

    console.log("metaData", metaData);
  });
});

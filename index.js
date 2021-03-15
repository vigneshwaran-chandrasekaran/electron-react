const electron = require("electron");
const ffmpeg = require("fluent-ffmpeg");

const { app, BrowserWindow, ipcMain } = electron;
let mainWindow;

app.on("ready", () => {
  console.log("App is ready", process.env.NODE_ENV);

  mainWindow = new BrowserWindow({
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

    mainWindow.webContents.send("video:metadata", metaData);

    console.log("metaData", metaData);
  });
});

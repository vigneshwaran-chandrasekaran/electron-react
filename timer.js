const electron = require("electron");
const path = require("path");

const { app, BrowserWindow, Tray } = electron;
let mainWindow = null;

app.on("ready", () => {
  mainWindow = new BrowserWindow({
    height: 500,
    width: 300,
    frame: false,
    resizable: false,
  });
  console.log("__dirname", __dirname);
  mainWindow.loadURL(`file://${__dirname}/src/index.html`);

  new Tray();
});

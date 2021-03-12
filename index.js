const electron = require("electron");

const { app, BrowserWindow } = electron;

app.on("ready", () => {
  console.log("App is ready");
  const mainWindow = new BrowserWindow({});
  console.log("__dirname", __dirname);
  mainWindow.loadURL(`file://${__dirname}/index.html`);
});

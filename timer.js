const electron = require("electron");
const path = require("path");

const { app, BrowserWindow, Tray } = electron;
let mainWindow = null;
let tray = null;

app.on("ready", () => {
  mainWindow = new BrowserWindow({
    height: 500,
    width: 300,
    frame: false,
    resizable: false,
    center: true,
    show: false,
  });
  console.log("__dirname", __dirname);
  mainWindow.loadURL(`file://${__dirname}/src/index.html`);

  const iconName =
    process.platform === "win32"
      ? "scuba-tank.png"
      : "Actions-user-properties-icon.png";
  const iconPath = path.join(__dirname, `./src/assets/${iconName}`);

  tray = new Tray(iconPath);
  // tray.setToolTip("hello electrol");

  tray.on("click", () => {
    if (mainWindow.isVisible()) {
      mainWindow.hide();
    } else {
      mainWindow.show();
    }
  });
});

// tray menu details
// https://gist.github.com/bellbind/f65f78a35bbbd4917a8ae4a6b18c5012

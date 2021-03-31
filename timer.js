const electron = require("electron");
const path = require("path");

const { app, BrowserWindow, Tray, screen } = electron;
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

  tray.on("click", (event, bounds) => {
    console.log("bounds", bounds);
    /** Click event bounds */
    // const { x, y } = bounds;

    /** Click event bounds */
    console.log("mainWindow.getBounds()", mainWindow.getBounds());
    /** get window height and width */
    const { height, width } = mainWindow.getBounds();

    // console.log("tray.getBounds()", tray.getBounds());
    // tray.getBounds() linux api still not available so using screen cursor pointer

    console.log("screen.getCursorScreenPoint()", screen.getCursorScreenPoint());

    const { x, y } = screen.getCursorScreenPoint();

    const yPosition = process.platform === "darwin" ? y : y - height;

    if (mainWindow.isVisible()) {
      mainWindow.hide();
    } else {
      mainWindow.setBounds({
        x: x - width / 2,
        y: yPosition,
        height,
        width,
      });
      mainWindow.show();
    }
  });
});

// tray menu details
// https://gist.github.com/bellbind/f65f78a35bbbd4917a8ae4a6b18c5012

const electron = require("electron");
const path = require("path");

const { shell } = require("electron");
// const emptyTrash = require("empty-trash");

const { app, BrowserWindow, Tray, screen, Menu } = electron;
let mainWindow = null;
let tray = null;

app.on("ready", () => {
  // app.dock.hide(); // this will hide the icon on task bar, its shows error so commented out
  mainWindow = new BrowserWindow({
    height: 500,
    width: 300,
    frame: false,
    resizable: false,
    center: true,
    show: false,
    skipTaskbar: true, // equivalent to app.dock.hide();
  });
  console.log("__dirname", __dirname);
  mainWindow.loadURL(`file://${__dirname}/src/index.html`);
  mainWindow.on("blur", () => {
    // mainWindow.hide(); // on blur hide not working, it completely close the app, so commented out
  });

  const iconName =
    process.platform === "win32"
      ? "scuba-tank.png"
      : "Actions-user-properties-icon.png";
  const iconPath = path.join(__dirname, `./src/assets/${iconName}`);

  tray = new Tray(iconPath);
  tray.setToolTip("Timer App");

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
    // shell.d("https://github.com");
    shell.beep();

    const menuConfig = Menu.buildFromTemplate([
      {
        label: "Quit the app",
        click: () => app.quit(),
      },
    ]);

    tray.setContextMenu(menuConfig);

    // (async () => {
    //   // await emptyTrash();
    // })();
  });
});

// tray menu details
// https://gist.github.com/bellbind/f65f78a35bbbd4917a8ae4a6b18c5012

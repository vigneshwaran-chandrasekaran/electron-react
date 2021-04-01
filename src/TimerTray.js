const electron = require("electron");
const { Tray } = electron;

class TimerTray extends Tray {
  constructor(iconPath, mainWindow) {
    super(iconPath);
    this.mainWindow = mainWindow;
    this.on("click", this.onClick.bind(this));
  }

  onClick(event, bounds) {
    console.log("bounds", bounds);
    /** Click event bounds */
    // const { x, y } = bounds;

    /** Click event bounds */
    console.log("mainWindow.getBounds()", this.mainWindow.getBounds());
    /** get window height and width */
    const { height, width } = this.mainWindow.getBounds();

    // console.log("tray.getBounds()", tray.getBounds());
    // tray.getBounds() linux api still not available so using screen cursor pointer

    console.log("screen.getCursorScreenPoint()", screen.getCursorScreenPoint());

    const { x, y } = screen.getCursorScreenPoint();

    const yPosition = process.platform === "darwin" ? y : y - height;

    if (this.mainWindow.isVisible()) {
      this.mainWindow.hide();
    } else {
      this.mainWindow.setBounds({
        x: x - width / 2,
        y: yPosition,
        height,
        width,
      });
      this.mainWindow.show();
    }
  }
}

module.exports = TimerTray;

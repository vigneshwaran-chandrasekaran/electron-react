const electron = require("electron");
const ffmpeg = require("fluent-ffmpeg");

const { app, BrowserWindow, Menu } = electron;
let mainWindow;
let addWindow;

let ctrl = "Ctrl"; // For windows and Ubuntu
let platform = process.platform;

if (platform === "darwin") {
  ctrl = "Command"; // For Mac
}

console.log("ctrl", ctrl);

function createAddWindow() {
  addWindow = new BrowserWindow({
    width: 300,
    height: 200,
    title: "Add New Todo",
  });
  addWindow.loadURL(`file://${__dirname}/add.html`);
}

const menuTemplate = [
  {
    label: "File",
    submenu: [
      {
        label: "New Tab",
        click() {
          createAddWindow();
        },
      },
      {
        label: "Show platform",
        accelerator: (() => {
          return `${ctrl}+I`;
        })(),
        click() {
          console.log("Hello " + platform);
        },
      },
      {
        label: "Close (வெளியேறு)",
        accelerator: `${ctrl}+Q`,
        click() {
          app.quit();
        },
      },
    ],
  },
];

if (platform === "darwin") {
  /**
   * On mac os, the file menu will merged into first menu,
   * to avoid that add empty object start of the menus
   */
  menuTemplate.unshift({});
}

if (process.env.NODE_ENV !== "production") {
  menuTemplate.push({
    label: "View",
    submenu: [
      {
        label: "Toggle Developer Tool",
        accelerator:
          platform === "darwin" ? `${ctrl}+Alt+I` : `${ctrl}+Shift+I`,
        click(item, focusedWindow) {
          focusedWindow.toggleDevTools();
        },
      },
    ],
  });
}

app.on("ready", () => {
  console.log("todo is ready", process.env.NODE_ENV);

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
  mainWindow.loadURL(`file://${__dirname}/todo.html`);

  /**
   * Close all window when main window is closed
   */
  mainWindow.on("closed", () => {
    app.quit();
  });

  const mainMenu = Menu.buildFromTemplate(menuTemplate);
  Menu.setApplicationMenu(mainMenu);
});

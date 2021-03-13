const electron = require("electron");
const ffmpeg = require("fluent-ffmpeg");

const { app, BrowserWindow, Menu } = electron;
let mainWindow;

const menuTemplate = [
  {
    label: "File",
    submenu: [
      { label: "New Tab" },
      {
        label: "Close (வெளியேறு)",
        click() {
          app.quit();
        },
      },
    ],
  },
];

if (process.platform === "darwin") {
  /**
   * On mac os, the file menu will merged into first menu,
   * to avoid that add empty object start of the menus
   */
  menuTemplate.unshift({});
}

app.on("ready", () => {
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

  const mainMenu = Menu.buildFromTemplate(menuTemplate);
  Menu.setApplicationMenu(mainMenu);
});

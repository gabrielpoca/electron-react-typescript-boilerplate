import { app, BrowserWindow } from "electron";
import * as path from "path";
import * as isDev from "electron-is-dev";

import notes from "./notes";

declare global {
  namespace NodeJS {
    interface Global {
      notes: typeof notes;
    }
  }
}

global.notes = notes;

let mainWindow: Electron.BrowserWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    height: 800,
    width: isDev ? 1500 : 900,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  mainWindow.loadURL(
    isDev
      ? "http://localhost:8080"
      : `file://${path.join(__dirname, "../../build/client/index.html")}`
  );

  if (isDev) mainWindow.webContents.openDevTools();

  mainWindow.on("closed", () => {
    mainWindow = null;
  });
}

app.allowRendererProcessReuse = true;

app.on("ready", createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (mainWindow === null) {
    createWindow();
  }
});

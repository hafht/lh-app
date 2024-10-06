import { BrowserWindow, shell, screen, app } from 'electron';
import { join } from 'path';
import { format } from 'url';
import { CFAppCore } from './core';
import { isTrustedUrl } from './utils/validate-external-url';
import { MainMenu } from './main-menu';
import { isDebug } from './utils/electron';

export default class App {
  // Keep a global reference of the window object, if you don't, the window will
  // be closed automatically when the JavaScript object is garbage collected.
  static mainWindow: Electron.BrowserWindow;

  public static isDevelopmentMode() {
    const isEnvironmentSet: boolean = 'ELECTRON_IS_DEV' in process.env;
    const getFromEnvironment: boolean =
      parseInt(process.env.ELECTRON_IS_DEV, 10) === 1;

    return isEnvironmentSet ? getFromEnvironment : !CFAppCore.environment().production;
  }

  private static onWindowAllClosed() {
    if (process.platform !== 'darwin') {
      app.quit();
    }
  }

  private static onClose() {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    App.mainWindow = null;
  }

  private static onRedirect(event: any, url: string) {
    if (url !== App.mainWindow.webContents.getURL()) {
      // this is a normal external redirect, open it in a new browser window
      event.preventDefault();
      shell.openExternal(url);
    }
  }

  private static onReady() {
    // This method will be called when Electron has finished
    // initialization and is ready to create browser windows.
    // Some APIs can only be used after this event occurs.
    if (CFAppCore.appConfig().development?.rendererAppName) {
      App.initMainWindow();
      App.loadMainWindow();
    }
  }

  private static onActivate() {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (App.mainWindow === null) {
      App.onReady();
    }
  }

  private static initMainWindow() {
    const workAreaSize = screen.getPrimaryDisplay().workAreaSize;
    const width = Math.min(1200, workAreaSize.width || 1200);
    const height = Math.min(800, workAreaSize.height || 800);
    MainMenu.setDefaultMenu()
    // Create the browser window.
    App.mainWindow = new BrowserWindow({
      width: width,
      height: height,
      show: false,
      webPreferences: {
        contextIsolation: true,
        backgroundThrottling: false,
        preload: join(__dirname, 'main.preload.js'),
      },
    });
    App.mainWindow.setMenu(null);
    App.mainWindow.center();

    // if main window is ready to show, close the splash window and show the main window
    App.mainWindow.once('ready-to-show', () => {
      App.mainWindow.show();
      if (isDebug()) {
        App.mainWindow.webContents.openDevTools()
      }
    });

    // handle all external redirects in a new browser window
    // App.mainWindow.webContents.on('will-navigate', App.onRedirect);
    // App.mainWindow.webContents.on('new-window', (event, url, frameName, disposition, options) => {
    //     App.onRedirect(event, url);
    // });

    // Emitted when the window is closed.
    App.mainWindow.on('closed', () => {
      // Dereference the window object, usually you would store windows
      // in an array if your app supports multi windows, this is the time
      // when you should delete the corresponding element.
      App.mainWindow = null;
    });

    App.mainWindow.webContents.on('page-title-updated', () => {
      App.mainWindow.setTitle(`${app.getName()} v${app.getVersion()}`)
    })

    App.mainWindow.webContents.setWindowOpenHandler((_) => {
      if (isTrustedUrl(_.url)) {
        shell.openExternal(_.url)
      } else {
        console.warn(`Prevent open url: ${_.url}`, _)
      }
      return { action: 'deny' }
    })
  }

  private static loadMainWindow() {
    // load the index.html of the app.
    if (isDebug()) {
      App.mainWindow.loadURL(`http://localhost:${CFAppCore.appConfig().development.rendererAppPort}`);
    } else {
      App.mainWindow.loadURL(
        format({
          pathname: join(__dirname, '..', CFAppCore.appConfig().development.rendererAppName, 'index.html'),
          protocol: 'file:',
          slashes: true,
        })
      );
    }
  }

  static main() {
    // we pass the Electron.App object and the
    // Electron.BrowserWindow into this function
    // so this class has no dependencies. This
    // makes the code easier to write tests for
    const gotTheLock = app.requestSingleInstanceLock();
    if (!gotTheLock) {
      app.quit();
      return;
    }
    app.on('second-instance', () => {
      // Someone tried to run a second instance, we should focus our window.
      const mainWindow = App.mainWindow;
      if (mainWindow) {
        if (mainWindow.isMinimized()) {
          mainWindow.restore();
        }
        mainWindow.focus();
      }
    });

    app.on('window-all-closed', App.onWindowAllClosed); // Quit when all windows are closed.
    app.on('ready', App.onReady); // App is ready to load data
    app.on('activate', App.onActivate); // App is activated
  }
}

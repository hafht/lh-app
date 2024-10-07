import { app, Menu, MenuItem } from "electron";
import App from "./app";
import { ElectronLogger } from "./logger";

export class MainMenu {
  private static isMac = process.platform === 'darwin'

  private static get About() {
    return new MenuItem({
      label: `About ${app.name}`,
      click: () => {
        // MainBrowser.send(IPC_EVENTS.APP_SHOW_ABOUT_PAGE, null);
      },
    });
  }

  private static get __Separator__() {
    return new MenuItem({ type: 'separator' });
  }

  private static get Troubleshooting() {
    return new MenuItem({
      label: 'Troubleshooting',
      submenu: [
        {
          label: 'Clear Logs',
          click: () => {
            ElectronLogger.clearLogs()
          }
        }
      ]
    })
  }
  // View
  private static get ToggleDevTools() {
    return new MenuItem({
      role: 'toggleDevTools',
      accelerator: MainMenu.isMac ? 'Cmd+Alt+I' : 'F12',
    });
  }

  private static get Reload() {
    return new MenuItem({
      role: 'reload',
      accelerator: MainMenu.isMac ? 'Cmd+R' : 'F5',
    });
  }
  private static get ForceReload() {
    return new MenuItem({
      role: 'forceReload',
      accelerator: MainMenu.isMac ? 'Shift+Cmd+R' : 'CmdOrCtrl+F5',
    });
  }

  static setDefaultMenu() {
    const  menubar = new Menu()

    if (MainMenu.isMac) {
      const applicationMenu = new Menu();
      applicationMenu.append(this.About);
      const macApplicationMenuItem = new MenuItem({ label: app.name, submenu: applicationMenu });
      menubar.append(macApplicationMenuItem);
    }

    // View
    const viewMenu = new Menu();
    viewMenu.append(this.Reload);
    viewMenu.append(this.ForceReload);
    viewMenu.append(this.ToggleDevTools);
    const viewMenuItem = new MenuItem({ label: '&View', submenu: viewMenu });
    menubar.append(viewMenuItem);

    const helpMenu = new Menu();
    helpMenu.append(MainMenu.Troubleshooting)

    const helpMenuItem = new MenuItem({ label: 'Help', submenu: helpMenu });

    menubar.append(helpMenuItem)
    Menu.setApplicationMenu(menubar);
  }
 }

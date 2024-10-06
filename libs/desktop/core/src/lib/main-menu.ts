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

  static setDefaultMenu() {
    const  menubar = new Menu()

    if (MainMenu.isMac) {
      const applicationMenu = new Menu();
      applicationMenu.append(this.About);
      const macApplicationMenuItem = new MenuItem({ label: app.name, submenu: applicationMenu });
      menubar.append(macApplicationMenuItem);
    }
    const helpMenu = new Menu();
    helpMenu.append(MainMenu.Troubleshooting)

    const helpMenuItem = new MenuItem({ label: 'Help', submenu: helpMenu });
    
    menubar.append(helpMenuItem)
    Menu.setApplicationMenu(menubar);
  }
 }
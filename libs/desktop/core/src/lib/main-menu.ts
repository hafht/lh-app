import { Menu, MenuItem } from "electron";
import { clearLogs } from "./logger";
import App from "./app";

export class MainMenu {
  private static isMac = process.platform === 'darwin'

  private static get About() {
    return new MenuItem({
      label: `About ${App.application.name}`,
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
            clearLogs()
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
      const macApplicationMenuItem = new MenuItem({ label: App.application.name, submenu: applicationMenu });
      menubar.append(macApplicationMenuItem);
    }
    const helpMenu = new Menu();
    helpMenu.append(MainMenu.Troubleshooting)

    const helpMenuItem = new MenuItem({ label: 'Help', submenu: helpMenu });
    
    menubar.append(helpMenuItem)
    Menu.setApplicationMenu(menubar);
  }
 }
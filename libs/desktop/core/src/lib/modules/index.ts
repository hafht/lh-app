import { ipcMain } from 'electron';

export interface  IACFAppElectronBasedModule {
  initialize: () => void;
}

export class CFAppElectronBasedModule implements IACFAppElectronBasedModule{
  private  _identify: string;
  constructor(identify: string) {
    this._identify = identify;
  }
  initialize() {
    // TODO
  }
}


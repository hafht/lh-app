// export const 

import { MainLogger } from './main'

export * from './main'

export const clearLogs = () => {
  MainLogger.clearLogFile()
}
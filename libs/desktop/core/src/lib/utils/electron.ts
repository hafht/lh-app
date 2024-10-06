import { app } from "electron"

export const isElectron = () => {
  return "browser" === process.type || "renderer" === process.type
}

export const isDebug = () => {
  return !app.isPackaged
}
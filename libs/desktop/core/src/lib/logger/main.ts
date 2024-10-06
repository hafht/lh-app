import { app } from 'electron';
import log from 'electron-log/main'

export class MainLogger {
 
 static initialize() {
  const logFormat = '{y}-{m}-{d} {h}:{i}:{s}:{ms} [Main] [{level}] {text}';
 
  if (app.isPackaged) {
    log.transports.console.level = false;
  } else {
    log.transports.console.level = 'debug';
    log.transports.console.format = logFormat;
  }
  log.initialize();
 }

 static log(...args: any[]) {
  return log.log(...args)
 }

 static info(...args: any[]) {
  return log.info(...args)
 }
 static debug(...args: any[]) {
  return log.debug(...args)
 }
 static warn(...args: any[]) {
  return log.warn(...args)
 }

 static error(...args: any[]) {
  return log.error(...args)
 }

 static clearLogFile() {
  try {
    log.transports.file.getFile()?.clear()
  } catch (error) { /* empty */ }
 }
}

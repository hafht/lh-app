import { Injectable } from "@angular/core";
import { create } from 'electron-log/renderer';

@Injectable({
  providedIn: 'root'
})

export class LoggerService {
  private logger!: ReturnType<typeof create>

  constructor() {
    this.initialize();
  }
  private initialize() {
    this.logger = create({
      logId: 'renderer'
    })
  }

  scope(label: string) {
    return this.logger.scope(label)
  }

  log(...params: any[]) {
    this.logger?.log(...params)
  }
  debug(...params: any[]) {
    this.logger?.debug(...params)
  }
  info(...params: any[]) {
    this.logger?.info(...params)
  }
  warn(...params: any[]) {

    this.logger?.warn(...params)
  }
  error(...params: any[]) {
    this.logger?.error(...params)
  }
}

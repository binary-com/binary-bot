export default class Logger {
  constructor() {
    this.logQueue = [];
    this.debug = false;
  }
  toggleDebug() {
    this.debug = !this.debug;
    if (this.debug) {
      for (const log of this.logQueue) {
        console.log(...log); // eslint-disable-line no-console
      }
      this.logQueue = [];
    }
  }
  addLogToQueue(...args) {
    this.logQueue.push(args);
  }
  isDebug() {
    return this.debug;
  }
}

export const logger = new Logger();

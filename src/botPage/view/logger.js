export default class Logger {
  constructor() {
    this.logQueue = [];
    this.debug = false;
    this.shown = [];
  }
  isNew(message) {
    const timestamp = parseInt(new Date().getTime() / 1000, 10);
    const index = this.shown.findIndex((e) => e.message === message);
    if (index >= 0) {
      const oldTimestamp = this.shown[index].timestamp;
      this.shown[index].timestamp = timestamp;
      if (timestamp - oldTimestamp >= 1) {
        return true;
      }
      return false;
    }
    this.shown.push({
      message,
      timestamp,
    });
    return true;
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
  notify(message, ...args) {
    if (this.isNew(message)) {
      $.notify(message, ...args);
    }
  }
}

export const logger = new Logger();

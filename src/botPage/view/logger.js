export default class Logger {
	constructor() {
		this.logQueue = [];
		this.debug = false;
	}
	toggleDebug() {
		this.debug = !this.debug;
		if (this.debug) {
			this.logQueue.forEach((log) => {
				console.log(...log);
			});
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

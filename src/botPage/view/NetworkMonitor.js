export default class NetworkMonitor {
    constructor(apiInstance, parentElement) {
        this.api = apiInstance;
        this.parentElement = parentElement;
        this.addEvents();
    }
    addEvents() {
        if ('onLine' in navigator) {
            window.addEventListener('online', () => this.setStatus());
            window.addEventListener('offline', () => this.setStatus());
        } else {
            navigator.onLine = true;
            setInterval(() => this.setStatus(), 10000);
        }
        this.setStatus();
    }
    setStatus() {
        if (navigator.onLine) {
            this.parentElement.html('<span class=\'connecting\'></span>');
            this.api.send({ ping: '1' }).then(() => {
                this.parentElement.html('<span class=\'online\'></span>');
            });
        } else {
            this.parentElement.html('<span class=\'offline\'></span>');
        }
    }
}

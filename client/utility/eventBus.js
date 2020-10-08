export default class EventBus {
    constructor() {
        this.eventBus = document.createElement('event-bus');
    }

    addEventListener(event, callback) {
        this.eventBus.addEventListener(event, callback);
    }

    removeEventListener(event, callback) {
        this.eventBus.removeEventListener(event, callback);
    }

    dispatchEvent(event, payload = {}) {
        this.eventBus.dispatchEvent(new CustomEvent(event, {
            detail: payload
        }));
    }
}

window.EventBus = new EventBus;
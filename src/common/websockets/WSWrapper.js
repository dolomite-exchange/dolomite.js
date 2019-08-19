
/*
 * Wrap a conventional HTTP/S get request into
 * a websocket esque interface.
 */
export default class WSWrapper {
  constructor(requestCallback, interval = -1) {
    this.requestCallback = requestCallback;
    this.subscribers = [];

    if (interval > 0) setInterval(() => this.trigger(), interval * 1000);
  }

  trigger() {
    const response = this.requestCallback()
    if (response) this.resolve(response);
  }

  subscribe(callback) {
    this.subscribers.push(callback);
  }

  resolve(promise) {
    promise.then(data => {
      this.subscribers.forEach(callback => callback(data));
    }).catch(e => {});
  }
}

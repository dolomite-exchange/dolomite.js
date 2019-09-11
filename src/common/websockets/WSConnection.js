
/*
 * 
 */
export default class WSConnection {
  constructor(url) {
    this.url = url;
    this.subscribers = {};
  }

  setupStream(stream) {
    this.connected = true;
    this.stream = stream;

    this.stream.onmessage = (message) => {
      const event = JSON.parse(message.data);
      const { route, action, data } = event;
      this.trigger(route, action, data);
    };

    this.stream.onclose = () => {
      this.reestablish();
    }

    if (!this.pingInterval) this.pingInterval = setInterval(() => {
      this.stream && this.send(null, 'ping')
      if (this.stream.readyState === WebSocket.CLOSED) {
        this.reestablish();
      }
    }, 15000);
  }

  trigger(route, action, data) {
    if (this.subscribers[route] && this.subscribers[route][action] && !!data)
      this.subscribers[route][action].forEach(callback => {
        setTimeout(() => callback(data), 0);
    });
  }

  //////////////////////
  // Interface Implementation

  /*
   * Establish a connection
   */
  establish() {
    return new Promise((resolve, reject) => {
      const stream = new WebSocket(this.url);

      stream.onerror = (error) => reject({ status: 'error' })
      stream.onopen = (open) => {
        this.setupStream(stream);
        resolve({ status: 'connected' });
      };
    });
  }

  reestablish() {
    console.log('Disconnected to webscoket')
    this.establish()
      .then(() => {
        console.log('Reconnected to webscoket');
        const callbacks = this.subscribers['reconnect'] || [];
        callbacks.forEach(cb => { try { cb() } catch (e) { } })
      })
      .catch((e) => {
        console.error('Failed to reconnect to websocket: ' + e)
      })
  }

  isConnected() {
    return this.connected || false;
  }

  disconnect() {
    // TODO: Implement
  }

  /*
   * Add subscribtions 
   * Mainly used to prime subscriptions from a previous connection
   */
  addSubscriptions(subscribers) {
    this.subscribers = {
      ...this.subscribers,
      ...subscribers
    };
  }

  /*
   * Get the current subscriptions
   */
  getSubscriptions() {
    return this.subscribers;
  }

  /*
   * Send an upstream request up to the websocket
   */
  send(route, action, payload) {
    const attempt = () => new Promise((resolve, reject) => {
      try {
        const success = this.stream.send(JSON.stringify({ route, action, data: payload }));
        resolve({ status: 'sent' })
      } catch(e) {
        reject(e)
      }
    });

    return attempt().catch(() => this.establish().then(() => attempt()))
  }

  /*
   * Subscribe to a downstream event from the websocket
   */
  subscribe(route, action, callback) {
    if (!this.subscribers[route]) 
      this.subscribers[route] = {};
    if (!this.subscribers[route][action]) 
      this.subscribers[route][action] = [];
    this.subscribers[route][action].push(callback);
  }

  /*
   * Register callback for reconnection
   */
  onReconnect(callback) {
    const key = 'reconnect';
    if (!this.subscribers[key]) this.subscribers[key] = [];
    this.subscribers[key].push(callback);
  }

  static get none() {
    return new WSConnection();
  }
}

WSConnection.interface = {
  addSubscriptions: () => {},
  getSubscriptions: () => ({}),
  establish: (url) => new Promise((res, rej) => rej()),
  disconnect: () => {},
  send: (route, action, payload) => new Promise((res, rej) => rej()),
  subscribe: (route, action, callback) => {},
  isConnected: () => false,
};

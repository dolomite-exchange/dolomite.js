import WSConnection from './WSConnection';

/*
 * 
 */
export default class WSManager {
  constructor() {
    this.mocks = {};
    this.connection = WSConnection.none;
  }

  onReconnect(callback) {
    this.connection.onReconnect(callback);
  }

  subscribe(route, action, callback) {
    this.connection.subscribe(route, action, callback);
  }

  send(route, action, payload) {
    return this.connection.send(route, action, payload);
  }

  setConnection(connection) {
    const previousConnection = this.connection;
    previousConnection.disconnect();
    connection.addSubscriptions(previousConnection.getSubscriptions());
    this.connection = connection;
  }

  disconnect() {
    this.connection.disconnect();
    this.connection = WSConnection.none;
  }

  isConnected() {
    const conn = this.connection || { isConnected: () => false };
    return conn.isConnected() || false;
  }
}

import WSManager from './websockets/WSManager';
import WSConnection from './websockets/WSConnection';
import BigNumber from './BigNumber';
import Service from './Service';

class PackageService extends Service {
  
  get(route, params = {}, headers = {}) {
    route = this.calculateRoute(route, { hydrate_all: true, ...params});
    return this.request('get', route.url, route.params, headers);
  }

  post(resource, params = {}, headers = {}) {
    route = this.calculateRoute(route, { hydrate_all: true, ...params});
    return this.request('post', route.url, route.params, headers);
  }

  put(resource, params = {}, headers = {}) {
    route = this.calculateRoute(route, { hydrate_all: true, ...params});
    return this.request('put', route.url, route.params, headers);
  }

  delete(resource, params = {}, headers = {}) {
    route = this.calculateRoute(route, { hydrate_all: true, ...params});
    return this.request('delete', route.url, route.params, headers);
  }
}

// --------------------------------

export default class Package extends PackageService {
  constructor({ url, websocketUrl, services }) {
    super(url, () => this.wsManager, {});
    
    this.url = url;
    this.wsUrl = websocketUrl;
    this.wsManager = new WSManager();

    this.services = this.setupServicesFor((k, v) => this[k] = v, services);
    this.serviceTypes = Object.keys(services).map(name => services[name]);
  }

  setupServicesFor(setParent, services) {
    let allServices = [];

    Object.keys(services).forEach(serviceName => {
      const ServiceType = services[serviceName];
      const service = new ServiceType(this.url, () => this.wsManager, ServiceType.routes);
      
      const subServices = ServiceType.services || [];
      this.setupServicesFor((k, v) => service[k] = v, subServices).forEach(s => allServices.push(s));
      setParent(serviceName, service);
      allServices.push(service);
    });

    return allServices;
  }

  configure({ apiKey, getAuthToken, url, websocketUrl }) {
    if (!this.getAuthToken) this.getAuthToken = (() => Promise.reject('getAuthToken not defined on package'));
    if (getAuthToken) this.getAuthToken = getAuthToken
    
    this.configureService(apiKey);
    if (url) this.url = url
    if (websocketUrl) this.wsUrl = websocketUrl

    this.services.forEach(service => {
      service.configureService(apiKey);
      service.getAuthToken = this.getAuthToken;
      if (url) service.url = url
    });
  }

  connectToWebsocket() {
    const connection = new WSConnection(this.wsUrl);
    
    return connection.establish()
      .then((data) => {
        this.wsManager.setConnection(connection);
        return data;
      }).catch(error => {
        this.wsManager.disconnect();
        throw error;
      });
  }

  onReconnect(callback) {
    this.wsManager && this.wsManager.onReconnect(callback);
  }

  get isConnected() {
    return this.wsManager ? this.wsManager.isConnected() : false;
  }

  get exports() {
    let classes = {
      BigNumber,
    };

    this.serviceTypes.forEach(ServiceType => {
      classes = {
        ...classes,
        ...(ServiceType.exports || {})
      };
    });

    return classes;
  }
}

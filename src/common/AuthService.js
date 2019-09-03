import Service from './Service';
import PrepareMessage from '../Exchange/Accounts/Verification/PrepareMessage';

const DEFAULT_WYRE_OPTIONS = { 
  addressKey: 'address',
  accountIdKey: 'account_id',
  signatureKey: 'auth_signature', 
  prepareIdKey: 'prepare_id', 
  prepareMessageKey: 'prepare_message', 
  flatten: false 
};

let activeAuthRequest;

class AuthService extends Service {

  getAuthToken() { return Promise.reject('getAuthToken not defined for service'); }

  withAuth(method) {
    return (resource, params, headers = {}) => {
      const callback = () => {
        return this.getAuthToken().then(authToken => {
          activeAuthRequest = null;
          return method(resource, params, {
            ...headers,
            Authorization: authToken
          });
        });
      };

      if (activeAuthRequest) activeAuthRequest.then(callback);
      else activeAuthRequest = callback();
      return activeAuthRequest;
    };
  }

  get requiresAuth() {
    return {
      get: this.withAuth(this.get.bind(this)),
      post: this.withAuth(this.post.bind(this)),
      prepare: this.withAuth(this.prepare.bind(this))
    };
  };

  withWyreAuth(method, routeName, options) {
    options = { ...DEFAULT_WYRE_OPTIONS, ...options };
    
    const getPrepareMessage = (account_id, address) => 
      this.prepare(routeName, { account_id, address })
        .then(body => new PrepareMessage(body.data))

    return (resource, params, headers = {}) => {
      const callback = () => {
        return this.getAuthToken(true, getPrepareMessage)
          .then(({ token, signature, prepareMessage, address, accountId }) => {
            activeAuthRequest = null;
            signature = (signature && options.flatten) ? signature.signature : signature;

            const authSigParams = token ? {} : {
              [options.signatureKey]: signature,
              [options.prepareIdKey]: prepareMessage && prepareMessage.id,
              [options.prepareMessageKey]: prepareMessage && prepareMessage.message,
            };

            return method(resource, {
              [options.addressKey]: address,
              [options.accountIdKey]: accountId,
              ...authSigParams,
              ...params,
            },{
              ...headers,
              Authorization: token
            });
          });
      };

      if (activeAuthRequest) activeAuthRequest.then(callback);
      else activeAuthRequest = callback();
      return activeAuthRequest;
    };
  }

  requiresWyreSession(prepareRouteName, options = {}) {
    return {
      get: this.withWyreAuth(this.get.bind(this), prepareRouteName, options),
      post: this.withWyreAuth(this.post.bind(this), prepareRouteName, options),
      prepare: this.withWyreAuth(this.prepare.bind(this), prepareRouteName, options)
    };
  }
}

export default AuthService;















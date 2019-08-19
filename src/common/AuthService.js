import Service from './Service';

class AuthService extends Service {

  getAuthToken() { return Promise.reject('getAuthToken not defined for service'); }

  withAuth(method) {
    return (resource, params, headers = {}) => 
      this.getAuthToken().then(authToken => 
        method(resource, params, {
          ...headers,
          Authorization: authToken
        })
      );
  }

  get requiresAuth() {
    return {
      get: this.withAuth(this.get.bind(this)),
      post: this.withAuth(this.post.bind(this)),
      prepare: this.withAuth(this.prepare.bind(this))
    };
  };
}

export default AuthService;

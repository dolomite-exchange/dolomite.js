import Service from '../../src/common/Service';
import fetchMock from 'fetch-mock';

const mocks = {
  '/test/:param': {
    get: {
      message: 'Mocked fetch calls are working!'
    }
  },
  '/error': {
    get: {
      status: 400,
      body: {
        status: 400,
        message: 'An error has occurred',
        code: 1738
      }
    }
  }
};

class MockService extends Service {
  constructor(url = '') {
    const routes = {
      test: {
        get: '/test/:param'
      },
      error: {
        get: '/error'
      }
    };

    super(url, null, routes, mocks);
  }

  getTest(param) {
    return this.get('test', { param });
  }

  getError() {
    return this.get('error');
  }
}

var mockService;
var fetchMockSpy;

/*
 * Test the Service class
 */
describe('Service', () => {

  beforeEach(() => {
    fetchMock.restore();
    mockService = new MockService('https://exchange-example.io');
  });

  it('should be able to be subclassed', () => {
    expect(mockService).toBeDefined();
  });

  describe('before #configure', () => {
    it('Should mock fetch calls', async () => {
      let response = await mockService.getTest('p');
      expect(response.message).toBe('Mocked fetch calls are working!');
    })
  })

  describe('#configure', () => {
    beforeEach(() => {
      fetchMockSpy = jest.spyOn(fetchMock, 'restore');
      mockService.configure('abc123-apikey');
    });

    it('should have the correct api key stored', () => {
      expect(mockService.apiKey).toBe('abc123-apikey');
    })

    it('should stop mocking fetch calls', () => {
      expect(fetchMockSpy).toHaveBeenCalled();
      fetchMockSpy.mockReset();
      fetchMockSpy.mockRestore();
    })
  })

  describe('#getRoute', () => {
    it('should return a valid route', () => {
      const route = mockService.getRoute('get', 'test');
      expect(route.url).toBe('https://exchange-example.io/test/:param');
    })

    describe('when passed parameters', () => {
      it('should return correct route url', async () => {
        const route = mockService.getRoute('get', 'test', { param: 'testing' });
        expect(route.url).toBe('https://exchange-example.io/test/testing');
      })

      it('should return correct params', async () => {
        const route = mockService.getRoute('get', 'test', { param: 'testing', another_param: 'no' });
        expect(route.params).toEqual({ another_param: 'no' });
      })
    })
  })

  describe('#fetch', () => {
    it('should return correct error', async () => {
      try {
        await mockService.getError();
      } catch(error) {
        expect(error).toBeDefined();
      }
    });
  })
});






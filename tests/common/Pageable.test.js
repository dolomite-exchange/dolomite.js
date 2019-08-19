import Pageable, { withPageableParams } from '../../src/common/Pageable';
import Service from '../../src/common/Service';
import * as mock from '../../src/__mocks/_globalMocks';

class FakeObject {
  constructor({ something, another_thing, yet_another_thing }) {
    this.something = something;
    this.anotherThing = another_thing;
    this.yetAnotherThing = yet_another_thing;
  }

  static build(jsonArray) {
    return jsonArray.map(fake => new FakeObject(fake));
  }
}

class FakeService extends Service {
  constructor(url = '') {
    const routes = {
      fakes: {
        get: '/fakes'
      },
    };

    const mocks = {
      '/fakes': {
          get: mock.Paged((path, request, params) => {
            return { 
              data: [
                { something: 'A' },
                { something: 'B' },
                { something: 'C' },
                { something: 'D' },
                { something: 'E' },
                { something: 'F' },
                { something: 'G' },
                { something: 'H' },
                { something: 'I' },
                { something: 'J' },
              ]
            };
          })
        },
    };

    super(url, null, routes, mocks);
  }

  getFakes(options = {}) {
    return Pageable.request(params => this.get('fakes', params))
      .build((data) => FakeObject.build(data))
      .get(options);
  }
}

describe('Pageable', () => {
  const fakeResponse = {
    paging_metadata: {
      cursor: 'to_implement', 
      page_number: 3,
      page_size: 4,
      sort_order: null
    },
    data: {
      fakes: [
        {
          something: 'Hello',
          another_thing: 'World',
          yet_another_thing: '!'
        },
        {
          something: 'Goodbye',
          another_thing: 'Mars',
          yet_another_thing: '?'
        }
      ]
    }
  };

  describe('#new (constructed with build callback)', () => {
    it('should be constructed properly', () => {
      const page = new Pageable(fakeResponse, (data) => FakeObject.build(data.fakes));

      expect(page.pageNumber).toBe(3);
      expect(page.pageSize).toBe(4);
      expect(page.length).toBe(2);
      expect(page[0].something).toBe('Hello');
      expect(page.filter(fake => fake.something === 'Hello').length).toBe(1);
      expect(page.map(fake => 'hi')[0]).toBe('hi');
      
      page.push(new FakeObject({
        something: 'Hello',
        another_thing: 'There'
      }));
      expect(page.length).toBe(3);
    });

    it('should not be able to call `getNextPage`', async () => {
      const page = new Pageable(fakeResponse, (data) => FakeObject.build(data.fakes));
      expect(page.canGetNextPage).toBe(false);

      try {
        await page.getNextPage()
        fail();
      } catch(e) {
        expect(e).toBeDefined();
      }
    })
  })

  describe('#request', () => {
    it('should ', async () => {
      const service = new FakeService();
      const page = await service.getFakes({ pageSize: 5 });

      const page_one = page.map(i => i.something);
      expect(page_one).toEqual(['A', 'B', 'C', 'D', 'E'])
      expect(page.canGetNextPage).toBe(true);
      
      await page.getNextPage();
      const page_two = page.map(i => i.something);
      expect(page_two).toEqual(['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'])
    })
  })
})

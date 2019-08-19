import { exchange } from '../../src';

describe('Exchange.Markets', () => {
  describe('#getAll', () => {
    it('should return correct models', async () => {
      const markets = await exchange.markets.getAll();
      const market = markets[0];

      expect(markets.length).toBeGreaterThan(0);
      expect(market).toBeDefined();
      expect(market.pair).toBeDefined();
    })
  })
})

import { slate } from '../../src';

const address = '0x0000000000000000000000000000000000000000';

describe('Slate.Wallets', () => {
  describe('#getPortfolio', () => {
    it('should return correct models', async () => {
      const portfolio = await slate.wallets.getPortfolio(address);

      expect(portfolio).toBeDefined();
      expect(portfolio.address).toBeDefined();
      expect(portfolio.currentValue.amount).toBeDefined();
      expect(portfolio.amountChange.amount).toBeDefined();
      expect(portfolio.percentChange).toBeDefined();
    })
  })

  describe('#getHoldings', () => {
    it('should return correct models', async () => {
      const holdings = await slate.wallets.getHoldings(address);
      const holding = holdings[0];

      expect(holdings.length).toBeGreaterThan(0);
      // expect(holdings.getNextPage).toBeDefined();

      expect(holding).toBeDefined();
      expect(holding.token).toBeDefined();
      expect(holding.balance.amount).toBeDefined();
      expect(holding.currentValue.amount).toBeDefined();
    })
  })

  describe('#getPortfolioGraph', () => {
    it('should return correct models', async () => {
      const chart = await slate.wallets.getPortfolioGraph(address);
      const point = chart[0];

      expect(chart).toBeDefined();
      expect(chart.currency).toBeDefined();
      expect(chart.currency.precision).toBeDefined();

      expect(point).toBeDefined();
      expect(point.timestamp).toBeDefined();
      expect(point.price.amount).toBeGreaterThanOrEqual(0);
    })
  })
})

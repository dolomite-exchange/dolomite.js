
import BigNumber from '../../src/common/BigNumber';

describe('BigNumber', () => {
  it('should be constructed properly', () => {
    const num = new BigNumber({
      amount: 1002345,
      currency: {
        ticker: "ETH",
        precision: 4,
        display_precision: 2
      }
    })
    expect(num.amount).toBe(100.2345);
  });
})

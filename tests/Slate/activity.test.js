import { slate } from '../../src';

const address = '0x0000000000000000000000000000000000000000';

describe('Slate.Activity', () => {
  describe('#getTransfers', () => {
    it('should return correct models', async () => {
      const transfers = await slate.activity.getTransfers(address);
      const transfer = transfers[0];

      expect(transfers.length).toBeGreaterThan(0);
      expect(transfer.fromAddress).toBeDefined();
      expect(transfer.toAddress).toBeDefined();
      expect(transfer.type).toBeDefined();
      expect(transfer.fee.amount).toBeDefined();
    })
  })
})

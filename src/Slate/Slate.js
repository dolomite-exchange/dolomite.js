import Package from '../common/Package';
import WalletService from './Wallets/WalletService';
import ActivityService from './Activity/ActivityService';
import TokenService from './Tokens/TokenService';

const SLATE_API_URL = 'https://slate-api.dolomite.io';
const SLATE_WEBSOCKET_URL = 'wss://slate-api.dolomite.io/ws-connect';

/*
 * 
 */
class Slate extends Package {
  constructor() {
    super({
      url: SLATE_API_URL,
      websocketUrl: SLATE_WEBSOCKET_URL,
      services: {
        wallets: WalletService,
        activity: ActivityService,
        tokens: TokenService
      }
    });
  }
}

const slate = new Slate();
export default slate;

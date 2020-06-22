import BigNumber from '../../common/BigNumber';
import Order from './Order';
import BN from 'bn.js';

const groupBy = (arr, match) => arr.reduce((obj, item) => {
  const key = match(item);
  obj[key] = obj[key] || [];
  obj[key].push(item);
  return obj;
}, {});

const sum = (arr, match) => arr.reduce((total, item) => total.add(match(item)), new BN('0'));
const oldestToYoungest = (a, b) => a.creationTimestamp - b.creationTimestamp;

/*
 * Volume (Depth) of sell or buy orders at a price
 */
export class OrderDepth {
  constructor({ primary_amount, secondary_amount, amount_usd, exchange_rate, 
    ordered_primary_fill_amounts, ordered_secondary_fill_amounts, orders }) {

    this.quantity = new BigNumber(primary_amount);
    this.total = new BigNumber(secondary_amount);
    this.totalUsd = amount_usd && new BigNumber(amount_usd);
    this.price = BigNumber.fromFloat(exchange_rate, this.total.precision);

    this.orders = orders || [];
    this.orderedPrimaryFillAmounts = ordered_primary_fill_amounts;
    this.orderedSecondaryFillAmounts = ordered_secondary_fill_amounts;
  }

  static build(depthArray) {
    return depthArray.map(depthJson => new OrderDepth(depthJson));
  }

  static merge(price, orders) {
    const orderedOrders = orders.sort(oldestToYoungest);
    
    const totalOpenPrimaryBN = sum(orderedOrders, (order) => order.openAmountPrimary.valueBN);
    const totalOpenSecondaryBN = sum(orderedOrders, (order) => order.openAmountSecondary.valueBN);

    const primaryCurrency = orders[0].openAmountPrimary.raw.currency;
    const secondaryCurrency = orders[0].openAmountSecondary.raw.currency;

    return new OrderDepth({
      primary_amount: {
        amount: totalOpenPrimaryBN,
        currency: primaryCurrency
      },
      secondary_amount: {
        amount: totalOpenSecondaryBN,
        currency: secondaryCurrency
      },
      exchange_rate: price,
      orders: orderedOrders,
      ordered_primary_fill_amounts: orderedOrders.map(order => order.openAmountPrimary),
      ordered_secondary_fill_amounts: orderedOrders.map(order => order.openAmountSecondary),
    });
  }
}

/*
 * Holds the OrderDepths for buy and sell orders
 */
export default class OrderDepthChart {
  constructor(pair, buys, sells) {
    this.marketPair = pair;
    this.buyDepths = buys;
    this.sellDepths = sells;
  }

  static build({ market, buys, sells }) {
    const buyDepths = OrderDepth.build(buys);
    const sellDepths = OrderDepth.build(sells);
    return new OrderDepthChart(market, buyDepths, sellDepths);
  }

  static buildUnmerged({ market, buys, sells }) {
    const buyOrders = Order.build(buys);
    const sellOrders = Order.build(sells);

    const buyDepths = OrderDepthChart.mergeOrders(buyOrders);
    const sellDepths = OrderDepthChart.mergeOrders(sellOrders);
    return new OrderDepthChart(market, buyDepths, sellDepths);
  }

  // ----------------------------------------------

  static mergeOrders(orders) {
    const grouped = groupBy(orders, (order) => order.price);
    return Object.entries(grouped)
      .map(([price, groupedOrders]) => OrderDepth.merge(price, groupedOrders))
  }
}

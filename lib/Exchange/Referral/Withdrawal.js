"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _BigNumber = _interopRequireDefault(require("../../common/BigNumber"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Withdrawal =
/*#__PURE__*/
function () {
  function Withdrawal(_ref) {
    var wallet_address = _ref.wallet_address,
        withdrawal_amount = _ref.withdrawal_amount,
        withdrawal_fee_amount = _ref.withdrawal_fee_amount,
        withdrawal_timestamp = _ref.withdrawal_timestamp,
        transaction_hash = _ref.transaction_hash,
        block_number = _ref.block_number,
        withdrawal_status = _ref.withdrawal_status;

    _classCallCheck(this, Withdrawal);

    this.walletAddress = wallet_address;
    this.withdrawalAmount = new _BigNumber["default"](withdrawal_amount);
    this.withdrawalFeeAmount = new _BigNumber["default"](withdrawal_fee_amount);
    this.withdrawalTimestamp = withdrawal_timestamp;
    this.transactionHash = transaction_hash;
    this.blockNumber = block_number;
    this.withdrawalStatus = withdrawal_status;
  }

  _createClass(Withdrawal, null, [{
    key: "build",
    value: function build(withdrawalJsonArray) {
      return withdrawalJsonArray.map(function (withdrawalJson) {
        return new Withdrawal(withdrawalJson);
      });
    }
  }]);

  return Withdrawal;
}();
/*
{ this.state.withdrawals && this.state.withdrawals.length > 0 ? (
            sortedWithdrawals.map((withdrawal, index) => (
              <div className={styles.friendRow}>
                <div className={styles.date}>
                  {toDate(withdrawal.time)}
                </div>
                <div className={`${styles.status} ${withdrawal.status === 'PENDING' ? styles.pending : withdrawal.status === 'COMPLETE' ? styles.complete : styles.failed}`}>
                  {withdrawal.status}
                </div>
                <div className={styles.amount}>
                  <span>{withdrawal.amount}</span><span className={styles.ethLabel}>WETH</span>
                </div>
              </div>
            ))
          ) : (
            <div className={styles.emptyList}>
              { this.props.excerpt('exchange.referral.withdrawals.empty') }
            </div>
          )}
 */

/*
{ this.state.loadingWithdrawals ? (
            <Spinner
              className={styles.spinner}
            />
          ) : (<div>
              { this.state.withdrawals && this.state.withdrawals.length > 0 ? (
                <div>{this.state.withdrawals.map((transaction, index) => (
                  <div className={styles.friendRow}>
                    <div className={styles.address}>
                      {transaction.referrerAddress}
                    </div>
                    <div className={styles.date}>
                      {toDate(transaction.blockTimestamp)}
                    </div>
                    <div className={styles.amount}>
                    <span className={styles.earning}>
                      <TokenAmount
                        amount={transaction.ethCommissionAmount.amount}
                        humanize
                      />
                    </span><span className={styles.ethLabel}>WETH</span>
                    </div>
                  </div>
                ))}
                  { this.state.withdrawals && this.state.withdrawals.canGetNextPage && (
                    <div className={styles.button}>
                      <Button
                        className={styles.loadMoreButton}
                        onClick={() => this.onLoadMore()}
                        variant="outlined"
                      >
                        {!this.state.loadingWithdrawals && this.props.excerpt('portfolio.transferList.loadMore')}
                      </Button>
                    </div>
                  )}
                </div>
              ) : (
                <div className={styles.emptyList}>
                  { this.props.excerpt('exchange.referral.withdrawals.empty') }
                </div>
              )}
            </div>
          )}
 */


exports["default"] = Withdrawal;
import BigNumber from "../../common/BigNumber";

export default class Withdrawal {
  constructor({wallet_address, withdrawal_amount, withdrawal_fee_amount, withdrawal_timestamp, transaction_hash, block_number, withdrawal_status}) {

    this.walletAddress = wallet_address;
    this.withdrawalAmount = new BigNumber(withdrawal_amount);
    this.withdrawalFeeAmount = new BigNumber(withdrawal_fee_amount);
    this.withdrawalTimestamp = withdrawal_timestamp;
    this.transactionHash = transaction_hash;
    this.blockNumber = block_number;
    this.withdrawalStatus = withdrawal_status;

  }

  static build(withdrawalJsonArray) {
    return withdrawalJsonArray.map(withdrawalJson => new Withdrawal(withdrawalJson));
  }
}

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
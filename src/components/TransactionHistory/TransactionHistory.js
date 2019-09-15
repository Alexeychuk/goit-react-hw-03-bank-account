import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styles from './TransactionHistory.module.css';

export default class TransactionHistory extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const { transactions } = this.props;
    return (
      <table className={styles.history}>
        <thead>
          <tr>
            <th>Transaction</th>
            <th>Amount</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map(transaction => (
            <tr key={transaction.id}>
              <td>{transaction.type}</td>
              <td>{transaction.amount}$</td>
              <td>{transaction.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}

TransactionHistory.propTypes = {
  transactions: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      amount: PropTypes.number.isRequired,
      date: PropTypes.string.isRequired,
    }),
  ).isRequired,
};

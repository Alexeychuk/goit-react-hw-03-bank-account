import React from 'react';
import PropTypes from 'prop-types';
import styles from './Balance.module.css';

const Balance = ({ transactions, balance }) => {
  const handleWithdraw = type => {
    const resultValue = transactions
      .filter(transaction => transaction.type === type)
      .reduce((acc, transaction) => {
        return Number(acc) + Number(transaction.amount);
      }, 0);

    return resultValue;
  };

  return (
    <section className={styles.balance}>
      <span role="img" aria-label="deposit">
        ⬆️{handleWithdraw('deposit')}$
      </span>
      <span role="img" aria-label="withdraw">
        ⬇️{handleWithdraw('withdrawal')}$
      </span>
      <span>Balance: {balance}$</span>
    </section>
  );
};

Balance.propTypes = {
  transactions: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      amount: PropTypes.number.isRequired,
      date: PropTypes.string.isRequired,
    }),
  ).isRequired,
  balance: PropTypes.number.isRequired,
};

export default Balance;

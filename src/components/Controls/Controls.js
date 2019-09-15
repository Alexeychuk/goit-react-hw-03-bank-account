import React, { Component } from 'react';
import PropTypes from 'prop-types';
import shortid from 'shortid';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import styles from './Controls.module.css';

toast.configure();

export default class Controls extends Component {
  constructor() {
    super();
    this.state = {
      input: '',
    };
  }

  handleInput = e => {
    this.setState({
      input: e.target.value,
    });
  };

  handleClick = e => {
    e.preventDefault();
    const { handleTransaction, balance } = this.props;
    const { input } = this.state;

    const date = new Date().toLocaleString();
    const amount = Number(input);

    const transaction = {
      id: shortid.generate(),
      type: e.target.name,
      amount,
      date,
    };

    if (input === '' || input === '0' || Number(input) < 0) {
      toast('Введите сумму для проведения операции!');
      this.setState({ input: '' });
      return;
    }

    if (input.length > 1 && input[0] === '0') {
      toast(' Некорректный ввод!');
      this.setState({ input: '' });
      return;
    }

    if (balance < transaction.amount && transaction.type === 'withdrawal') {
      toast('На счету недостаточно средств для проведения операции!');
      // console.log('not enough money');
      this.setState({ input: '' });
      return;
    }

    handleTransaction(transaction);
    this.setState({ input: '' });
  };

  render() {
    const { input } = this.state;
    return (
      <section className={styles.controls}>
        <input type="number" value={input} onChange={this.handleInput} />
        <button type="button" name="deposit" onClick={this.handleClick}>
          Deposit
        </button>
        <button type="button" name="withdrawal" onClick={this.handleClick}>
          Withdraw
        </button>
      </section>
    );
  }
}

Controls.propTypes = {
  handleTransaction: PropTypes.func.isRequired,
  balance: PropTypes.number.isRequired,
};

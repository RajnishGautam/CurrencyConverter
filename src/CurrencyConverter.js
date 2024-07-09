import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const CurrencyConverter = () => {
    const [amount, setAmount] = useState(1);
    const [fromCurrency, setFromCurrency] = useState('USD');
    const [toCurrency, setToCurrency] = useState('EUR');
    const [exchangeRate, setExchangeRate] = useState();
    const [convertedAmount, setConvertedAmount] = useState();

    useEffect(() => {
        const fetchExchangeRate = async () => {
            try {
                const response = await axios.get(`https://api.exchangeratesapi.io/latest?base=${fromCurrency}&symbols=${toCurrency}`);
                const rate = response.data.rates[toCurrency];
                if (rate) {
                    setExchangeRate(rate);
                } else {
                    throw new Error(`No exchange rate found for ${fromCurrency} to ${toCurrency}`);
                }
            } catch (error) {
                console.error('Error fetching exchange rate:', error);
                // Handle error state here
            }
        };
    
        fetchExchangeRate();
    }, [fromCurrency, toCurrency]);
    

    const handleAmountChange = (e) => {
        setAmount(e.target.value);
    };

    const handleFromCurrencyChange = (e) => {
        setFromCurrency(e.target.value);
    };

    const handleToCurrencyChange = (e) => {
        setToCurrency(e.target.value);
    };

    const handleConvert = () => {
        const convertedValue = amount * exchangeRate;
        setConvertedAmount(convertedValue.toFixed(2)); // Round to 2 decimal places
    };

    return (
        <div className="currency-converter">
  <h2>Currency Converter</h2>
  <form>
    <div className="form-group">
      <label>Amount:</label>
      <input
        type="number"
        value={amount}
        onChange={handleAmountChange}
        className="form-control"
        placeholder="Enter amount"
      />
    </div>
    <div className="form-group">
      <label>From Currency:</label>
      <select
        value={fromCurrency}
        onChange={handleFromCurrencyChange}
        className="form-control"
      >
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="GBP">GBP</option>
        <option value="JPY">JPY</option>
        {/* Add more currencies as needed */}
      </select>
    </div>
    <div className="form-group">
      <label>To Currency:</label>
      <select
        value={toCurrency}
        onChange={handleToCurrencyChange}
        className="form-control"
      >
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="GBP">GBP</option>
        <option value="JPY">JPY</option>
        {/* Add more currencies as needed */}
      </select>
    </div>
    <button
      onClick={handleConvert}
      className="btn btn-primary"
    >
      Convert
    </button>
  </form>
  {convertedAmount && (
    <div className="result">
      <p>
        {amount} {fromCurrency} is equal to {convertedAmount} {toCurrency}
      </p>
    </div>
  )}
</div>
    );
};

export default CurrencyConverter;

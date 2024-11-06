import React, { useEffect, useState } from "react";
import axios from "axios";

const Currency = () => {
  const [exchangeRates, setExchangeRates] = useState([]);
  const apiKey = "4bb0e8d4fb0541f5971f7d1750d32c35"; 
  const apiUrl = `https://api.currencyfreaks.com/v2.0/rates/latest?apikey=${apiKey}`;

  const kategoriCurrency = ["CAD", "EUR", "IDR", "JPY", "CHF", "GBP"];

  useEffect(() => {
    const fetchRates = async () => {
      try {
        const response = await axios.get(apiUrl);
        const rates = response.data.rates;

        const processedRates = kategoriCurrency.map((currency) => {
          const exchangeRate = parseFloat(rates[currency]);
          return {
            currency,
            exchangeRate: exchangeRate.toFixed(4),
            weBuy: (exchangeRate * 1.05).toFixed(4),
            weSell: (exchangeRate * 0.95).toFixed(4),
          };
        });

        setExchangeRates(processedRates);
      } catch (error) {
        console.error("Error fetching exchange rates:", error);
      }
    };

    fetchRates();
  }, [apiUrl, kategoriCurrency]);

  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>Currency</th>
            <th>We Buy (USD)</th>
            <th>Exchange Rate (USD)</th>
            <th>We Sell (USD)</th>
          </tr>
        </thead>
        <tbody>
          {exchangeRates.map((rate) => (
            <tr key={rate.currency}>
              <td>{rate.currency}</td>
              <td>{rate.weBuy}</td>
              <td>{rate.exchangeRate}</td>
              <td>{rate.weSell}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p>Rates are based from 1 USD</p>
    </div>
  );
};

export default Currency;

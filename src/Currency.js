import React, { useEffect, useState } from "react";
import axios from "axios";

const Currency = () => {
  const [exchangeRates, setExchangeRates] = useState([]);
  const apiKey = "219447e0afaa41d5a442123543bb117e"; 
  const apiUrl = `https://api.currencyfreaks.com/v2.0/rates/latest?apikey=${apiKey}`;

  useEffect(() => {
    const kategoriCurrency = ["CAD", "EUR", "IDR", "JPY", "CHF", "GBP"];
    
    const ambilDataKurs = async () => {
      try {
        const response = await axios.get(apiUrl);
        const kurs = response.data.rates;

        const kursDiproses = kategoriCurrency.map((currency) => {
          const nilaiKurs = parseFloat(kurs[currency]);
          return {
            currency,
            exchangeRate: nilaiKurs.toFixed(4),
            weBuy: (nilaiKurs * 1.05).toFixed(4),
            weSell: (nilaiKurs * 0.95).toFixed(4),
          };
        });

        setExchangeRates(kursDiproses);
      } catch (error) {
        console.error("Error mengambil data kurs:", error);
      }
    };

    ambilDataKurs();
  }, [apiUrl]);

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

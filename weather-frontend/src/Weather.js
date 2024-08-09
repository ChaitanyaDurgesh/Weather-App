import React, { useState } from 'react';
import axios from 'axios';
import './Weather.css';

function Weather() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState('');

  const fetchWeather = async () => {
    if (!city) {
      setError('Please enter a city name');
      setWeather(null);
      return;
    }

    try {
      const response = await axios.get(`http://localhost:5000/weather?city=${city}`);
      setWeather(response.data);
      setError('');
    } catch (err) {
      setError('Unable to fetch weather data');
      setWeather(null);
    }
  };

  const getWeatherClass = () => {
    if (!weather) return 'default-sky';

    const temp = weather.main?.temp;
    const description = weather.weather?.[0]?.description.toLowerCase();

    if (temp <= 0) return 'cold';
    if (temp > 0 && temp <= 15) return 'cool';
    if (temp > 15 && temp <= 25) return 'warm';
    if (temp > 25) return 'hot';

    if (description.includes('clear')) return 'clear-sky';
    if (description.includes('cloud')) return 'cloudy-sky';
    if (description.includes('rain')) return 'rainy-sky';
    if (description.includes('thunder')) return 'thunder-sky';
    if (description.includes('snow')) return 'snowy-sky';

    return 'default-sky';
  };

  return (
    <div className={`weather-container ${getWeatherClass()}`}>
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Enter city"
        className="weather-input"
      />
      <button onClick={fetchWeather} className="weather-button">Get Weather</button>

      {error && <p className="error">{error}</p>}

      {weather && (
        <div className="weather-info">
          <h2>{weather.name}</h2>
          <p>Temperature: {weather.main?.temp}°C</p>
          <p>Weather: {weather.weather?.[0]?.description}</p>
        </div>
      )}
    </div>
  );
}

export default Weather;
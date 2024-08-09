const express = require('express');
const axios = require('axios');
const dotenv = require('dotenv');
const cors = require('cors');

// Load environment variables from .env file
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const API_KEY = process.env.WEATHER_API_KEY;
const BASE_URL = 'http://api.openweathermap.org/data/2.5/weather';

// Use CORS to allow cross-origin requests
app.use(cors());

// Endpoint to get weather data
app.get('/weather', async (req, res) => {
  const { city } = req.query;

  // Basic validation for city parameter
  if (!city) {
    return res.status(400).json({ error: 'City name is required' });
  }

  try {
    const response = await axios.get(`${BASE_URL}?q=${city}&appid=${API_KEY}&units=metric`);
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching weather data:', error.message);
    if (error.response) {
      console.error('Error data:', error.response.data);
      res.status(error.response.status).json({ error: error.response.data.message });
    } else {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

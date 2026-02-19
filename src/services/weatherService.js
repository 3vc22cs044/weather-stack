import axios from 'axios';

const API_KEY = '69e4c8e63218bc1bb4ec5e1f137e6ec3';
const BASE_URL = 'http://api.weatherstack.com';

const weatherApi = axios.create({
  baseURL: BASE_URL,
  params: {
    access_key: API_KEY,
  },
});

export const getCurrentWeather = async (query) => {
  try {
    const response = await weatherApi.get('/current', {
      params: { query },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching current weather:', error);
    throw error;
  }
};

export const getHistoricalWeather = async (query, date) => {
  try {
    const response = await weatherApi.get('/historical', {
      params: {
        query,
        historical_date: date,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching historical weather:', error);
    throw error;
  }
};

export const getForecast = async (query) => {
  try {
    const response = await weatherApi.get('/forecast', {
      params: {
        query,
        forecast_days: 7,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching forecast:', error);
    throw error;
  }
};

export default {
  getCurrentWeather,
  getHistoricalWeather,
  getForecast,
};

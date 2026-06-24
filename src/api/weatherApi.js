const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5';
const GEO_URL = 'https://api.openweathermap.org/geo/1.0';

export const weatherApi = {
  getForecast: async (lat, lon, lang = 'uk') => {
    try {
      const response = await fetch(
        `${BASE_URL}/forecast?lat=${lat}&lon=${lon}&units=metric&lang=${lang}&appid=${API_KEY}`
      );
      if (!response.ok) {
        throw new Error(`Помилка отримання погоди: ${response.statusText}`);
      }
      return await response.json();
    } catch (error) {
      console.error(error);
      throw error;
    }
  },

  searchCities: async (query) => {
    if (!query.trim()) return [];
    try {
      const response = await fetch(
        `${GEO_URL}/direct?q=${encodeURIComponent(query)}&limit=5&appid=${API_KEY}`
      );
      if (!response.ok) {
        throw new Error(`Помилка пошуку міста: ${response.statusText}`);
      }
      return await response.json();
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
};

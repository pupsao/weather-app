export const geoApi = {
  getUserLocation: async () => {
    try {
      const response = await fetch('https://get.geojs.io/v1/ip/geo.json');
      if (!response.ok) {
        throw new Error('Не вдалося отримати локацію по IP');
      }
      return await response.json();
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
};

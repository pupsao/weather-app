import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  uk: {
    translation: {
      "app": {
        "title": "Weather App",
      },
      "tabs": {
        "home": "Головна",
        "favorites": "Обране"
      },
      "weatherBlock": {
        "today": "Сьогодні",
        "5days": "На 5 днів",
        "emptyState": "👆 Введіть назву міста у пошук вище, щоб побачити погоду",
        "geoLocating": "Визначаємо вашу локацію...",
        "loading": "Завантаження...",
        "fetchError": "Не вдалося завантажити погоду. Можливо, невірний API ключ?",
        "deleteConfirmTitle": "Підтвердження",
        "deleteConfirmMessage": "Ви впевнені, що хочете видалити цей блок погоди?",
        "deleteBlockTitle": "Видалити блок",
        "cancel": "Скасувати",
        "ok": "ОК"
      },
      "weatherCard": {
        "noData": "Дані про погоду відсутні",
        "favoriteBadge": "★ Обране",
        "removeFromFav": "Видалити з обраного",
        "addToFav": "Додати в обране",
        "feelsLike": "Відчувається як",
        "humidity": "Вологість",
        "wind": "Вітер",
        "windUnit": "м/с",
        "deleteFavTitle": "Підтвердження",
        "deleteFavMessage": "Ви впевнені, що хочете видалити це місто з обраного?"
      },
      "hourlyChart": {
        "hourlyTemp": "Температура (°C) по годинах",
        "dailyTemp": "Середня температура (°C) по днях"
      },
      "cityAutocomplete": {
        "placeholder": "Пошук міста...",
        "searching": "Шукаємо...",
        "noResults": "Місто не знайдено",
        "searchError": "Не вдалося завантажити результати"
      },
      "appLevel": {
        "limitTitle": "Ліміт блоків",
        "limitMessage": "Максимальна кількість блоків погоди - 5. Видаліть якийсь блок, щоб додати новий.",
        "attention": "Увага",
        "addCityBtn": "+ Додати місто",
        "noFavorites": "Ви ще не додали жодного міста в обране.\nПоверніться на Головну та натисніть зірочку біля назви міста!"
      },
      "layout": {
        "switchToDark": "Перемкнути на темну тему",
        "switchToLight": "Перемкнути на світлу тему"
      }
    }
  },
  en: {
    translation: {
      "app": {
        "title": "Weather App"
      },
      "tabs": {
        "home": "Home",
        "favorites": "Favorites"
      },
      "weatherBlock": {
        "today": "Today",
        "5days": "5 Days",
        "emptyState": "👆 Enter a city name in the search above to see the weather",
        "geoLocating": "Detecting your location...",
        "loading": "Loading...",
        "fetchError": "Failed to load weather. Maybe invalid API key?",
        "deleteConfirmTitle": "Confirmation",
        "deleteConfirmMessage": "Are you sure you want to delete this weather block?",
        "deleteBlockTitle": "Delete block",
        "cancel": "Cancel",
        "ok": "OK"
      },
      "weatherCard": {
        "noData": "No weather data available",
        "favoriteBadge": "★ Favorite",
        "removeFromFav": "Remove from favorites",
        "addToFav": "Add to favorites",
        "feelsLike": "Feels like",
        "humidity": "Humidity",
        "wind": "Wind",
        "windUnit": "m/s",
        "deleteFavTitle": "Confirmation",
        "deleteFavMessage": "Are you sure you want to remove this city from favorites?"
      },
      "hourlyChart": {
        "hourlyTemp": "Temperature (°C) hourly",
        "dailyTemp": "Average temperature (°C) daily"
      },
      "cityAutocomplete": {
        "placeholder": "Search city...",
        "searching": "Searching...",
        "noResults": "City not found",
        "searchError": "Failed to load results"
      },
      "appLevel": {
        "limitTitle": "Blocks Limit",
        "limitMessage": "Maximum number of weather blocks is 5. Delete a block to add a new one.",
        "attention": "Attention",
        "addCityBtn": "+ Add city",
        "noFavorites": "You haven't added any cities to favorites yet.\nGo back to Home and click the star next to the city name!"
      },
      "layout": {
        "switchToDark": "Switch to dark theme",
        "switchToLight": "Switch to light theme"
      }
    }
  }
};

const savedSettings = JSON.parse(localStorage.getItem('weather-app-settings') || '{}');
const initialLang = savedSettings?.state?.lang || 'uk';

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: initialLang, // мова за замовчуванням зі стору
    fallbackLng: "en",
    interpolation: {
      escapeValue: false // React вже екранує значення від XSS
    }
  });

export default i18n;

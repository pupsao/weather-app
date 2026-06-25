# Weather App (React Test Task)

## 🚀 Live Demo
You can view the working object at this link: **[Watch Demo](https://pupsao.github.io/weather-app/)**

A responsive, feature-rich weather application built with React, Vite, and Zustand. The app allows users to search for cities, view current weather, 5-day forecasts, and hourly temperature charts, as well as manage a list of favorite cities.

## 🚀 Features

- **City Search & Autocomplete**: Search for any city worldwide using the OpenWeather Geo API.
- **Detailed Forecasts**: View current weather, feels-like temperature, humidity, and wind speed.
- **Multiple Views**: Switch between "Today" (hourly forecast) and "5 Days" (daily average forecast).
- **Interactive Charts**: Visual representation of temperature trends using `Chart.js`.
- **Favorites Management**: Add up to 5 cities to your favorites for quick access. Persisted locally.
- **Dark/Light Theme**: Fully functional theme switcher using CSS variables.
- **Internationalization (i18n)**: Switch seamlessly between English and Ukrainian languages (`react-i18next`).
- **Responsive Design**: Optimized for both mobile and desktop screens.

## 🛠 Tech Stack

- **Framework**: React 18 + Vite
- **State Management**: Zustand (with persist middleware for LocalStorage)
- **Styling**: SCSS Modules + CSS Custom Properties (Variables)
- **Charting**: Chart.js (`chart.js/auto`)
- **i18n**: `react-i18next`
- **API**: OpenWeatherMap (Data & Geo API)

## ⚠️ Security & Architecture Note: API Key

**Important:** In this educational/test project, the OpenWeatherMap API key is currently exposed in the client-side bundle via the `.env` file (`VITE_OPENWEATHER_API_KEY`). 

> This is a known and conscious limitation for the sake of simplicity in a pure frontend assignment. 

**Production Ready Solution:** 
If this application were deployed to a production environment, this approach would pose a security risk (key exhaustion/abuse). To resolve this, I would implement a lightweight backend proxy (e.g., using **Vercel Serverless Functions**, **Netlify Functions**, or a **Cloudflare Worker**). The frontend would make requests to the proxy without the key, and the serverless function would securely append the API key stored in server environment variables before calling the OpenWeatherMap API.

## 📦 Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/pupsao/weather-app.git
   cd weather-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure Environment Variables**
   Create a `.env` file in the root directory and add your OpenWeatherMap API key:
   ```env
   VITE_OPENWEATHER_API_KEY=your_api_key_here
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Build for production**
   ```bash
   npm run build
   ```

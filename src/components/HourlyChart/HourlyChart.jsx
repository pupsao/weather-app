import { useEffect, useRef } from 'react';
import { Chart, LineController, LineElement, PointElement, LinearScale, CategoryScale, Filler, Tooltip, Legend } from 'chart.js';

Chart.register(LineController, LineElement, PointElement, LinearScale, CategoryScale, Filler, Tooltip, Legend);
import { useTranslation } from 'react-i18next';
import { FORECAST_DAYS } from '../../constants';
import styles from './HourlyChart.module.scss';

export const HourlyChart = ({ weatherData, viewMode = '1day' }) => {
  const { t, i18n } = useTranslation();
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (!weatherData || !weatherData.list || weatherData.list.length === 0 || !chartRef.current) return;

    let labels;
    let data;
    let labelTitle;

    if (viewMode === '1day') {
      const dataSlice = weatherData.list.slice(0, 8);
      labels = dataSlice.map(item => {
        const date = new Date(item.dt * 1000);
        return date.toLocaleTimeString(i18n.language === 'en' ? 'en-US' : 'uk-UA', { hour: '2-digit', minute: '2-digit' });
      });
      data = dataSlice.map(item => Math.round(item.main.temp));
      labelTitle = t('hourlyChart.hourlyTemp');
    } else {
      const dailyData = {};
      weatherData.list.forEach(item => {
        const dateObj = new Date(item.dt * 1000);
        const dateStr = dateObj.toLocaleDateString(i18n.language === 'en' ? 'en-US' : 'uk-UA', { day: 'numeric', month: 'short' });
        
        if (!dailyData[dateStr]) {
          dailyData[dateStr] = item.main.temp;
        } else if (item.main.temp > dailyData[dateStr]) {
          dailyData[dateStr] = item.main.temp;
        }
      });

      const allDays = Object.keys(dailyData);
      const days = allDays.length > FORECAST_DAYS ? allDays.slice(1, FORECAST_DAYS + 1) : allDays;
      
      labels = days;
      data = days.map(day => Math.round(dailyData[day]));
      labelTitle = t('hourlyChart.dailyTemp');
    }

    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    const ctx = chartRef.current.getContext('2d');
    
    chartInstance.current = new Chart(ctx, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [{
          label: labelTitle,
          data: data,
          borderColor: '#007bff',
          backgroundColor: 'rgba(0, 123, 255, 0.1)',
          borderWidth: 2,
          fill: true,
          tension: 0.4 
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: true,
            position: 'top'
          }
        },
        scales: {
          y: {
            beginAtZero: false,
            ticks: {
              callback: function(value) {
                return value + '°';
              }
            }
          }
        }
      }
    });

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [weatherData, viewMode, t, i18n.language]);

  if (!weatherData) return null;

  return (
    <div className={styles.chartContainer}>
      <canvas ref={chartRef}></canvas>
    </div>
  );
};

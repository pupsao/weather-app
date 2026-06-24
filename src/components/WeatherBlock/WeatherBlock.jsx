import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useWeatherStore } from '../../store/useWeatherStore';
import { weatherApi } from '../../api/weatherApi';
import { CityAutocomplete } from '../CityAutocomplete/CityAutocomplete';
import { WeatherCard } from '../WeatherCard/WeatherCard';
import { HourlyChart } from '../HourlyChart/HourlyChart';
import { Modal } from '../Modal/Modal';
import { Loader } from '../Loader/Loader';
import styles from './WeatherBlock.module.scss';

export const WeatherBlock = ({ block, canDelete, isFavoriteMode = false, isGeoLocating = false }) => {
  const { t, i18n } = useTranslation();
  const { removeBlock, updateBlockCity } = useWeatherStore();
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [viewMode, setViewMode] = useState('1day');
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  useEffect(() => {
    let ignore = false;

    const fetchWeather = async (city) => {
      setLoading(true);
      setError(null);
      try {
        const data = await weatherApi.getForecast(city.lat, city.lon, i18n.language);
        if (!ignore) {
          setWeatherData(data);
        }
      } catch (err) {
        if (!ignore) {
          setError(t('weatherBlock.fetchError'));
        }
        console.error(err);
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    };

    if (block.city) {
      fetchWeather(block.city);
    }

    return () => {
      ignore = true;
    };
  }, [block.city, i18n.language, t]);

  const handleCitySelect = (selectedCity) => {
    updateBlockCity(block.id, selectedCity);
  };

  return (
    <div className={styles.blockContainer}>
      <div className={styles.blockHeader}>
        <div className={styles.searchWrapper}>
          {!isFavoriteMode ? (
            <CityAutocomplete onCitySelect={handleCitySelect} />
          ) : (
            <h3 className={styles.favoriteTitle}>
              {block.city?.name}
            </h3>
          )}
        </div>
        
        {canDelete && !isFavoriteMode && (
          <button 
            className={styles.deleteBtn} 
            onClick={() => setIsDeleteModalOpen(true)}
            title={t('weatherBlock.deleteBlockTitle')}
          >
            &times;
          </button>
        )}
      </div>

      {error && <div className={styles.error}>{error}</div>}
      {loading && <Loader />}

      {!loading && !error && block.city && weatherData && (
        <div className={styles.content}>
          <WeatherCard weatherData={weatherData} cityInfo={block.city} />
          
          <div className={styles.toggleWrapper}>
            <button 
              className={`${styles.toggleBtn} ${viewMode === '1day' ? styles.active : ''}`}
              onClick={() => setViewMode('1day')}
            >
              {t('weatherBlock.today')}
            </button>
            <button 
              className={`${styles.toggleBtn} ${viewMode === '5days' ? styles.active : ''}`}
              onClick={() => setViewMode('5days')}
            >
              {t('weatherBlock.5days')}
            </button>
          </div>

          <HourlyChart weatherData={weatherData} viewMode={viewMode} />
        </div>
      )}

      {!block.city && !loading && !error && (
        <div className={styles.emptyState}>
          {isGeoLocating ? (
            <Loader inline={true} text={t('weatherBlock.geoLocating')} />
          ) : (
            t('weatherBlock.emptyState')
          )}
        </div>
      )}

      <Modal 
        isOpen={isDeleteModalOpen}
        title={t('weatherBlock.deleteConfirmTitle')}
        message={t('weatherBlock.deleteConfirmMessage')}
        cancelText={t('weatherBlock.cancel')}
        confirmText={t('weatherBlock.ok')}
        onConfirm={() => {
          setIsDeleteModalOpen(false);
          removeBlock(block.id);
        }}
        onCancel={() => setIsDeleteModalOpen(false)}
      />
    </div>
  );
};

import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import styles from './WeatherCard.module.scss';
import { useWeatherStore } from '../../store/useWeatherStore';
import { useAppStore } from '../../store/useAppStore';
import { Modal } from '../Modal/Modal';

export const WeatherCard = ({ weatherData, cityInfo }) => {
  const { t } = useTranslation();
  const { favorites, addFavorite, removeFavorite } = useWeatherStore();
  const { showAlert } = useAppStore();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  
  if (!weatherData || !cityInfo) {
    return <div className={styles.loading}>{t('weatherCard.noData')}</div>;
  }

  const current = weatherData.list[0];
  const iconUrl = `https://openweathermap.org/img/wn/${current.weather[0].icon}@4x.png`;
  
  const isFavorite = favorites.some((f) => f.lat === cityInfo.lat && f.lon === cityInfo.lon);

  const toggleFavorite = () => {
    if (isFavorite) {
      setIsDeleteModalOpen(true);
    } else {
      const result = addFavorite(cityInfo);
      if (!result.success) {
        if (result.reason === 'limit') {
          showAlert(t('appLevel.attention'), t('appLevel.limitMessage'));
        }
      }
    }
  };

  return (
    <div className={`${styles.card} ${isFavorite ? styles.favoriteCard : ''}`}>
      <div className={styles.header}>
        <div className={styles.titleWrapper}>
          <h2 className={styles.cityName}>{cityInfo.name}</h2>
          {isFavorite && <span className={styles.favBadge}>{t('weatherCard.favoriteBadge')}</span>}
        </div>
        <button 
          className={`${styles.favBtn} ${isFavorite ? styles.active : ''}`}
          onClick={toggleFavorite}
          title={isFavorite ? t('weatherCard.removeFromFav') : t('weatherCard.addToFav')}
        >
          {isFavorite ? '★' : '☆'}
        </button>
      </div>

      <div className={styles.body}>
        <div className={styles.tempBlock}>
          <div className={styles.temp}>{Math.round(current.main.temp)}°</div>
          <div className={styles.description}>
            {current.weather[0].description}
          </div>
        </div>
        <img src={iconUrl} alt={current.weather[0].description} className={styles.icon} />
      </div>

      <div className={styles.footer}>
        <div>{t('weatherCard.feelsLike')}: <strong>{Math.round(current.main.feels_like)}°C</strong></div>
        <div>{t('weatherCard.humidity')}: <strong>{current.main.humidity}%</strong></div>
        <div>{t('weatherCard.wind')}: <strong>{current.wind.speed} {t('weatherCard.windUnit')}</strong></div>
      </div>

      <Modal 
        isOpen={isDeleteModalOpen}
        title={t('weatherCard.deleteFavTitle')}
        message={t('weatherCard.deleteFavMessage')}
        cancelText={t('weatherBlock.cancel')}
        confirmText={t('weatherBlock.ok')}
        onConfirm={() => {
          setIsDeleteModalOpen(false);
          removeFavorite(cityInfo.lat, cityInfo.lon);
        }}
        onCancel={() => setIsDeleteModalOpen(false)}
      />
    </div>
  );
};

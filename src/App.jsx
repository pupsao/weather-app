import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Layout } from './components/Layout/Layout';
import { Tabs } from './components/Tabs/Tabs';
import { WeatherBlock } from './components/WeatherBlock/WeatherBlock';
import { Modal } from './components/Modal/Modal';
import { useWeatherStore } from './store/useWeatherStore';
import { useAppStore } from './store/useAppStore';
import { geoApi } from './api/geoApi';
import { weatherApi } from './api/weatherApi';
import { MAX_BLOCKS } from './constants';
import styles from './App.module.scss';

function App() {
  const { t, i18n } = useTranslation();
  const [activeTab, setActiveTab] = useState('home');
  const { blocks, addBlock, favorites, updateBlockCity } = useWeatherStore();
  const { theme, lang, alertModal, showAlert, closeAlert } = useAppStore();

  const [geoLocating, setGeoLocating] = useState(false);

  useEffect(() => {
    const initLocation = async () => {
      if (blocks.length === 1 && !blocks[0].city) {
        setGeoLocating(true);
        try {
          const location = await geoApi.getUserLocation();
          if (location && location.city) {
            const cities = await weatherApi.searchCities(location.city);
            if (cities && cities.length > 0) {
              updateBlockCity(blocks[0].id, cities[0]);
            }
          }
        } catch (error) {
          console.error("Не вдалося визначити локацію по IP", error);
        } finally {
          setGeoLocating(false);
        }
      }
    };
    initLocation();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleAddBlock = () => {
    if (blocks.length >= MAX_BLOCKS) {
      showAlert(t('appLevel.limitTitle'), t('appLevel.limitMessage'));
      return;
    }
    addBlock();
  };

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  useEffect(() => {
    i18n.changeLanguage(lang);
  }, [lang, i18n]);

  return (
    <Layout>
      <Tabs activeTab={activeTab} onTabChange={setActiveTab} />

      {activeTab === 'home' && (
        <div>
          {blocks.map((block, index) => (
            <WeatherBlock 
              key={block.id} 
              block={block} 
              canDelete={blocks.length > 1}
              isGeoLocating={geoLocating && index === 0}
            />
          ))}
          
          {blocks.length < MAX_BLOCKS && (
            <button 
              className={styles.addCityBtn}
              onClick={handleAddBlock}
            >
              {t('appLevel.addCityBtn')}
            </button>
          )}
        </div>
      )}

      {activeTab === 'favorites' && (
        <div>
          {favorites.length === 0 ? (
            <div className={styles.emptyFavorites}>
              {t('appLevel.noFavorites')}
            </div>
          ) : (
            favorites.map((city) => (
              <WeatherBlock 
                key={`fav-${city.lat}-${city.lon}`} 
                block={{ id: `fav-${city.lat}-${city.lon}`, city }} 
                canDelete={false} 
                isFavoriteMode={true}
              />
            ))
          )}
        </div>
      )}

      <Modal 
        isOpen={alertModal.isOpen}
        title={alertModal.title}
        message={alertModal.message}
        hideCancel={true}
        onConfirm={closeAlert}
      />
    </Layout>
  );
}

export default App;

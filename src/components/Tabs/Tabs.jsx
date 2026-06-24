import { useTranslation } from 'react-i18next';
import styles from './Tabs.module.scss';

export const Tabs = ({ activeTab, onTabChange }) => {
  const { t } = useTranslation();

  return (
    <div className={styles.tabsContainer}>
      <button 
        className={`${styles.tab} ${activeTab === 'home' ? styles.active : ''}`}
        onClick={() => onTabChange('home')}
      >
        {t('tabs.home')}
      </button>
      <button 
        className={`${styles.tab} ${activeTab === 'favorites' ? styles.active : ''}`}
        onClick={() => onTabChange('favorites')}
      >
        {t('tabs.favorites')}
      </button>
    </div>
  );
};

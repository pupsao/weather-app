import { useAppStore } from '../../store/useAppStore';
import { useTranslation } from 'react-i18next';
import styles from './Layout.module.scss';

export const Layout = ({ children }) => {
  const { theme, toggleTheme, lang, toggleLang } = useAppStore();
  const { t } = useTranslation();

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>{t('app.title')}</h1>
        <div className={styles.headerActions}>
          <button 
            className={styles.langToggle}
            onClick={toggleLang}
            title={lang === 'uk' ? 'Switch to English' : 'Перемкнути на українську'}
          >
            {lang === 'uk' ? 'EN' : 'UK'}
          </button>
          <button 
            className={styles.themeToggle} 
            onClick={toggleTheme}
            title={theme === 'light' ? t('layout.switchToDark') : t('layout.switchToLight')}
          >
            {theme === 'light' ? '🌙' : '☀️'}
          </button>
        </div>
      </header>
      <main className={styles.mainContent}>
        {children}
      </main>
    </div>
  );
};

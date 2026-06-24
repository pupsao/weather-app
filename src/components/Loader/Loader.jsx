import styles from './Loader.module.scss';
import { useTranslation } from 'react-i18next';

export const Loader = ({ inline = false, text = null }) => {
  const { t } = useTranslation();
  const label = text === null ? t('weatherBlock.loading') : text;

  return (
    <div className={`${styles.loaderContainer} ${inline ? styles.inline : ''}`}>
      <div className={styles.spinner}></div>
      {label && <span className={styles.text}>{label}</span>}
    </div>
  );
};

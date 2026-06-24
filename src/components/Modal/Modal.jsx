import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import styles from './Modal.module.scss';

export const Modal = ({ isOpen, title, message, onConfirm, onCancel, confirmText, cancelText, hideCancel = false }) => {
  const { t } = useTranslation();
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        {title && <h3 className={styles.title}>{title}</h3>}
        <p className={styles.message}>{message}</p>
        <div className={styles.actions}>
          {!hideCancel && (
            <button className={styles.cancelBtn} onClick={onCancel}>{cancelText || t('weatherBlock.cancel')}</button>
          )}
          <button className={styles.confirmBtn} onClick={onConfirm}>{confirmText || t('weatherBlock.ok')}</button>
        </div>
      </div>
    </div>
  );
};

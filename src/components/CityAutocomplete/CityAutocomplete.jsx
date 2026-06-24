import { useState, useEffect, useRef } from 'react';
import { weatherApi } from '../../api/weatherApi';
import { useTranslation } from 'react-i18next';
import { Loader } from '../Loader/Loader';
import styles from './CityAutocomplete.module.scss';
import useDebounce from '../../hooks/useDebounce';

export const CityAutocomplete = ({ onCitySelect }) => {
  const { t } = useTranslation();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef(null);
  
  const debouncedQuery = useDebounce(query, 500);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    let ignore = false;

    if (!debouncedQuery.trim()) {
      return;
    }

    const fetchCities = async () => {
      setLoading(true);
      try {
        const data = await weatherApi.searchCities(debouncedQuery);
        if (!ignore) {
          setResults(data || []);
          setIsOpen(true);
        }
      } catch (err) {
        if (!ignore) {
          console.error('Failed to fetch cities:', err);
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    };

    fetchCities();

    return () => {
      ignore = true;
    };
  }, [debouncedQuery]);

  const handleSelect = (city) => {
    setQuery('');
    setIsOpen(false);
    onCitySelect(city);
  };

  return (
    <div className={styles.wrapper} ref={wrapperRef}>
      <input
        type="text"
        className={styles.input}
        placeholder={t('cityAutocomplete.placeholder')}
        value={query}
        onClick={() => { if (results.length > 0) setIsOpen(true); }}
        onChange={(e) => {
          const val = e.target.value;
          setQuery(val);
          if (!val.trim()) {
            setResults([]);
          }
          setIsOpen(true);
        }}
      />
      {loading && (
        <div className={styles.loadingContainer}>
          <Loader inline={true} text={t('cityAutocomplete.searching')} />
        </div>
      )}
      
      {isOpen && results.length > 0 && (
        <ul className={styles.dropdown}>
          {results.map((city, idx) => (
            <li 
              key={`${city.lat}-${city.lon}-${idx}`} 
              onClick={() => handleSelect(city)}
            >
              {city.name}{city.state ? `, ${city.state}` : ''}, {city.country}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

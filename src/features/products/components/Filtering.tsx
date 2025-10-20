import React, { useState, useEffect, useRef } from 'react';
import styles from '../css/styles.module.css';
import { useNavigate, useLocation, createSearchParams } from 'react-router';
import Icons from '../../../shared/icons';
import { categoryList } from '../json/categoryList';
import Input from '../../../shared/components/input/Input';

const Filtering: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [search, setSearch] = useState(() => {
    const params = new URLSearchParams(location.search);
    return params.get('search') || '';
  });

  const [selected, setSelected] = useState(() => {
    const params = new URLSearchParams(location.search);
    return params.get('filter') || 'all';
  });

  const debounceRef = useRef(null);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    setSearch(params.get('search') || '');
    setSelected(params.get('filter') || 'all');
  }, [location.search]);

  const updateURL = (newSearch: string, newFilter: string) => {
    const params: any = {};
    if (newSearch.trim() !== '') params.search = newSearch.trim();
    if (newFilter !== 'all') params.filter = newFilter;

    navigate({
      pathname: '/products',
      search: `?${createSearchParams(params)}`,
    });
  };

  const searchHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearch(value);

    if (debounceRef.current) clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(() => {
      updateURL(value, selected);
    }, 1000);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      if (debounceRef.current) clearTimeout(debounceRef.current);
      updateURL(search, selected);
    }
  };

  const handleClick = (value: string) => {
    setSelected(value);
    updateURL(search, value);
  };

  return (
    <div className={styles.filteringContainer}>
      <h4>
        <Icons name="bx-filter" /> فیلتر
      </h4>

      <div className={styles.smallSearchSection}>
        <p>جستجو در نتایج</p>
        <Input
          type="text"
          placeholder="جستجو..."
          className={styles.smallSearch}
          name="search"
          value={search}
          onChange={searchHandler}
          onKeyDown={handleKeyDown}
        />
      </div>

      <ul>
        {categoryList.map((cat) => (
          <li
            key={cat.value}
            className={cat.value === selected ? styles.selected : ''}
            onClick={() => handleClick(cat.value)}
          >
            {cat.label}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Filtering;

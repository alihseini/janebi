import React, { useState, useEffect, useRef } from 'react';
import styles from '../css/styles.module.css';
import { useNavigate, useLocation, createSearchParams } from 'react-router';
import Icons from '../../../shared/icons';
import { categoryList } from '../json/categoryList';
import Input from '../../../shared/components/input/Input';
import { brandsList } from '../json/brandsList';

const Filtering: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [search, setSearch] = useState(() => {
    const params = new URLSearchParams(location.search);
    return params.get('search') || '';
  });

  const [brandSearch, setBrandSearch] = useState(''); // 👈 سرچ مخصوص برندها
  const [selected, setSelected] = useState(() => {
    const params = new URLSearchParams(location.search);
    return params.get('filter') || 'all';
  });

  const debounceRef = useRef<any>(null);

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

  // 🔹 سرچ برای فیلتر نتایج
  const searchHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearch(value);

    if (debounceRef.current) clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(() => {
      updateURL(value, selected);
    }, 1000);
  };

  // 🔹 سرچ برای فیلتر برندها (بدون debounce)
  const brandSearchHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBrandSearch(e.target.value);
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

  // 🔹 فیلتر برندها با سرچ
  const filteredBrands = brandsList.filter(
    (brand) =>
      brand.name.toLowerCase().includes(brandSearch.toLowerCase()) ||
      brand.title.toLowerCase().includes(brandSearch.toLowerCase())
  );

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

      <div className={styles.brandSection}>
        <p>برند ها</p>
        <Input
          type="text"
          placeholder="جستجو در برند ها..."
          className={styles.brandSearch}
          name="brandSearch"
          value={brandSearch}
          onChange={brandSearchHandler}
        />
        <div className={styles.brandList}>
          {filteredBrands.length > 0 ? (
            filteredBrands.map((brand) => (
              <label key={brand.name} className={styles.brandItem}>
                <div>
                  <span className={styles.brandTitle}>{brand.title}</span>
                  <input type="checkbox" />
                </div>
                <span>{brand.name}</span>
              </label>
            ))
          ) : (
            <p className={styles.noBrand}>برندی یافت نشد</p>
          )}
        </div>
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

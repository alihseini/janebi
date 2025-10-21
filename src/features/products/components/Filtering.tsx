import React, { useState, useEffect, useRef } from 'react';
import styles from '../css/styles.module.css';
import { useNavigate, useLocation, createSearchParams } from 'react-router';
import Icons from '../../../shared/icons';
import { categoryList } from '../json/categoryList';
import Input from '../../../shared/components/Input/Input';
import { brandsList } from '../json/brandsList';
import SwitchButton from '../../../shared/components/SwitchButton/SwitchButton';

const Filtering: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [search, setSearch] = useState(() => {
    const params = new URLSearchParams(location.search);
    return params.get('search') || '';
  });

  const [brandSearch, setBrandSearch] = useState('');
  const [debouncedBrandSearch, setDebouncedBrandSearch] = useState('');
  const [selected, setSelected] = useState(() => {
    const params = new URLSearchParams(location.search);
    return params.get('filter') || 'all';
  });

  const debounceRef = useRef<any>(null);
  const brandDebounceRef = useRef<any>(null);

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

  // 🔹 سرچ برای فیلتر نتایج با debounce
  const searchHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearch(value);

    if (debounceRef.current) clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(() => {
      updateURL(value, selected);
    }, 1000);
  };

  // 🔹 سرچ برندها با debounce
  const brandSearchHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setBrandSearch(value);

    if (brandDebounceRef.current) clearTimeout(brandDebounceRef.current);

    brandDebounceRef.current = setTimeout(() => {
      setDebouncedBrandSearch(value);
    }, 500);
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

  // 🔹 فیلتر برندها با سرچ debounce شده
  const filteredBrands = brandsList.filter(
    (brand) =>
      brand.name.toLowerCase().includes(debouncedBrandSearch.toLowerCase()) ||
      brand.title.toLowerCase().includes(debouncedBrandSearch.toLowerCase())
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
      <div className={styles.specialButtons}>
        <SwitchButton text="فقط آیتم های موجود" />
        <SwitchButton text="فقط آیتم های تخفیف دار" />
        <SwitchButton text="فقط آیتم های ویژه" />
      </div>
    </div>
  );
};

export default Filtering;

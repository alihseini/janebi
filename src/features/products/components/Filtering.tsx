import React, { useState, useEffect, useRef, useCallback } from 'react';
import styles from '../css/styles.module.css';
import { useNavigate, useLocation, createSearchParams } from 'react-router';
import Icons from '../../../shared/icons';
import { categoryList } from '../json/categoryList';
import Input from '../../../shared/components/Input/Input';
import { brandsList } from '../json/brandsList';
import SwitchButton from '../../../shared/components/SwitchButton/SwitchButton';
import TwoRangeSlider from '../../../shared/components/RangeSlider/TwoRangeSlider';
import useDebouncedCallback from '../../../shared/hooks/UseDebouncedCallback';

const Filtering: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // ---------------------- states ----------------------
  const [search, setSearch] = useState(
    () => new URLSearchParams(location.search).get('search') || ''
  );
  const [brandSearch, setBrandSearch] = useState('');
  const [debouncedBrandSearch, setDebouncedBrandSearch] = useState('');
  const [selected, setSelected] = useState(
    () => new URLSearchParams(location.search).get('filter') || 'all'
  );

  const [minPrice, setMinPrice] = useState<number>(
    () => Number(new URLSearchParams(location.search).get('minPrice')) || 0
  );
  const [maxPrice, setMaxPrice] = useState<number>(
    () => Number(new URLSearchParams(location.search).get('maxPrice')) || 1000
  );

  // ---------------------- debounce ----------------------
  const searchDebounce = useDebouncedCallback((value: string) => {
    updateURL(value, selected, minPrice, maxPrice);
  }, 1000);

  const brandDebounce = useDebouncedCallback((value: string) => {
    setDebouncedBrandSearch(value);
  }, 500);

  const priceDebounce = useDebouncedCallback((min: number, max: number) => {
    updateURL(search, selected, min, max);
  }, 500);

  // ---------------------- sync با URL ----------------------
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    setSearch(params.get('search') || '');
    setSelected(params.get('filter') || 'all');
    setMinPrice(Number(params.get('minPrice')) || 0);
    setMaxPrice(Number(params.get('maxPrice')) || 1000);
  }, [location.search]);

  // ---------------------- update URL ----------------------
  const updateURL = (
    newSearch: string,
    newFilter: string,
    newMinPrice?: number,
    newMaxPrice?: number
  ) => {
    const params: any = {};
    if (newSearch.trim() !== '') params.search = newSearch.trim();
    if (newFilter !== 'all') params.filter = newFilter;
    if (newMinPrice !== undefined) params.minPrice = newMinPrice;
    if (newMaxPrice !== undefined) params.maxPrice = newMaxPrice;

    navigate({
      pathname: '/products',
      search: `?${createSearchParams(params)}`,
    });
  };

  // ---------------------- handlers ----------------------
  const searchHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearch(value);
    searchDebounce(value);
  };

  const brandSearchHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setBrandSearch(value);
    brandDebounce(value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      searchDebounce(search);
    }
  };

  const handleClick = (value: string) => {
    setSelected(value);
    updateURL(search, value, minPrice, maxPrice);
  };

  const handlePriceChange = (min: number, max: number) => {
    setMinPrice(min);
    setMaxPrice(max);
    priceDebounce(min, max);
  };

  // ---------------------- filtered data ----------------------
  const filteredBrands = brandsList.filter(
    (brand) =>
      brand.name.toLowerCase().includes(debouncedBrandSearch.toLowerCase()) ||
      brand.title.toLowerCase().includes(debouncedBrandSearch.toLowerCase())
  );

  const filteredProducts = categoryList.filter((product) => {
    const price = product.price || 0;
    const matchesSearch = product.label
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesCategory = selected === 'all' || product.category === selected;
    const matchesPrice = price >= minPrice && price <= maxPrice;
    return matchesSearch && matchesCategory && matchesPrice;
  });

  // ---------------------- render ----------------------
  return (
    <div className={styles.filteringContainer}>
      <h4>
        <Icons name="bx-filter" /> فیلتر
      </h4>

      {/* search */}
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

      {/* دسته‌بندی */}
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

      {/* برندها */}
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

      {/* رنج قیمت */}
      <div className={styles.rangeSection}>
        <TwoRangeSlider
          minRange={0}
          maxRange={1000}
          minGap={50}
          onChange={handlePriceChange}
        />
      </div>

      {/* سوئیچ‌ها */}
      <div className={styles.specialButtons}>
        <SwitchButton text="فقط آیتم های موجود" />
        <SwitchButton text="فقط آیتم های تخفیف دار" />
        <SwitchButton text="فقط آیتم های ویژه" />
      </div>

      {/* لیست محصولات */}
      <ul className={styles.productList}>
        {filteredProducts.map((product) => (
          <li key={product.value}>
            {product.label} - {product.price} تومان
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Filtering;

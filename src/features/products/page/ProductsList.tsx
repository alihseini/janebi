import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router';
import { useProducts } from '../services/useProducts';
import Filtering from '../components/Filtering';
import Cards from '../components/Cards';

const ProductsList: React.FC = () => {
  const { data: products = [], isLoading, isError } = useProducts();
  const [searchParams] = useSearchParams();

  const filter = searchParams.get('filter') || '';
  const search = searchParams.get('search') || '';

  // مقدار اولیه از localStorage یا مقدار پیش‌فرض
  const [minPrice, setMinPrice] = useState(() => {
    const stored = localStorage.getItem('minPrice');
    return stored ? Number(stored) : 0;
  });
  const [maxPrice, setMaxPrice] = useState(() => {
    const stored = localStorage.getItem('maxPrice');
    return stored ? Number(stored) : 1000;
  });

  // وقتی URL مقدار جدید داده، state رو به‌روز کن
  useEffect(() => {
    const urlMin = Number(searchParams.get('minPrice'));
    const urlMax = Number(searchParams.get('maxPrice'));

    if (!isNaN(urlMin)) setMinPrice(urlMin);
    if (!isNaN(urlMax)) setMaxPrice(urlMax);
  }, [searchParams]);

  // ذخیره در localStorage وقتی state تغییر کرد
  useEffect(() => {
    localStorage.setItem('minPrice', String(minPrice));
    localStorage.setItem('maxPrice', String(maxPrice));
  }, [minPrice, maxPrice]);

  const filteredProducts = React.useMemo(() => {
    return products
      .filter((p) =>
        filter ? p.category.toLowerCase() === filter.toLowerCase() : true
      )
      .filter((p) =>
        search ? p.title.toLowerCase().includes(search.toLowerCase()) : true
      )
      .filter((p) => {
        const price = p.price || 0;
        return price >= minPrice && price <= maxPrice;
      });
  }, [products, filter, search, minPrice, maxPrice]);

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Something went wrong.</p>;

  return (
    <>
      <Filtering />
      <Cards data={filteredProducts} />
    </>
  );
};

export default ProductsList;

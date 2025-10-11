import React, { useEffect, useState } from 'react';
import styles from './styles.module.css';
import Filtering from './filtering/Filtering';
import Cards from './cards/Cards';
import { useQuery } from '@tanstack/react-query';
import { fetchProducts } from '../landing/services/services';
import { useSearchParams } from 'react-router';

const Products: React.FC = () => {
  const {
    data: products,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts,
  });
  
  const [searchParams] = useSearchParams();
  const filter = searchParams.get('filter') || '';

  const [filteredProducts, setFilteredProducts] = useState(products);

  useEffect(() => {
    if (!products) return;

    if (!filter) {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(
        products.filter((p) =>
          p.category.toLowerCase().includes(filter.toLowerCase())
        )
      );
    }
  }, [products, filter]);

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Something went wrong.</p>;

  return (
    <div className={styles.container}>
      <Filtering />
      <Cards data={filteredProducts} />
    </div>
  );
};

export default Products;

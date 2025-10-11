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
  const search = searchParams.get('search') || '';

  const [filteredProducts, setFilteredProducts] = useState(products);

  useEffect(() => {
    if (!products) return;

    let tempProducts = products;

    if (filter) {
      tempProducts = tempProducts.filter((p) =>
        p.category.toLowerCase().includes(filter.toLowerCase())
      );
    }

    if (search) {
      tempProducts = tempProducts.filter((p) =>
        p.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    setFilteredProducts(tempProducts);
  }, [products, filter, search]);

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

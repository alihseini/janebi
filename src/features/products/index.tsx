import React from 'react';
import styles from './styles.module.css';
import Filtering from './filtering/Filtering';
import Cards from './cards/Cards';
import { useQuery } from '@tanstack/react-query';
import { fetchProducts } from '../landing/services/services';

const Products: React.FC = () => {
  const { data: products } = useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts,
  });
  return (
    <div className={styles.container}>
      <Filtering />
      <Cards data={products} />
    </div>
  );
};

export default Products;

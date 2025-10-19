import React from 'react';
import styles from './css/styles.module.css';
import ProductsList from './page/ProductsList';

const Products: React.FC = () => {
  return (
    <div className={styles.productContainer}>
      <ProductsList />
    </div>
  );
};

export default Products;

import React from 'react';
import styles from './styles.module.css';
import { shortenTitle } from '../../utils/utils';

interface Product {
  id: number;
  price: number;
  title: string;
  description: string;
  category: string;
  image: string;
  rating: { rate: number; count: number };
}

interface CartMakerProps {
  product: Product;
  onClick?: () => void;
}

const CartMaker: React.FC<CartMakerProps> = ({ product }) => {
  return (
    <div className={styles.cart}>
      <img src={product?.image} alt="img" />
      <p>{shortenTitle(product?.title)}</p>
      <span className={styles.price}>قیمت: ${product?.price}</span>
    </div>
  );
};

export default CartMaker;

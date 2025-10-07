import React from 'react';
import styles from './styles.module.css';
import { shortenDesc } from '../../utils/utils';

interface Product {
  id: number;
  price: number;
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
      <p>{shortenDesc(product?.description)}</p>
      <p className={styles.price}>قیمت: ${product?.price}</p>
    </div>
  );
};

export default CartMaker;

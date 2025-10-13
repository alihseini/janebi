import React from 'react';
import styles from './styles.module.css';
import { shortenTitle } from '../../utils/utils';
import { useNavigate } from 'react-router';

interface Product {
  id: number;
  price: number;
  title: string;
  description: string;
  category: string;
  image: string;
  rating: { rate: number; count: number };
}

interface CardMakerProps {
  product: Product;
  fullWidth: boolean;
}

const CardMaker: React.FC<CardMakerProps> = ({
  product,
  fullWidth = false,
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/products/${product.id}`);
  };

  return (
    <div
      className={`${styles.card} ${
        fullWidth ? styles.fullWidth : styles.fixedWidth
      }`}
      onClick={handleClick}
    >
      <img src={product.image} alt={product.title} />
      <p>{shortenTitle(product.title)}</p>
      <span className={styles.price}>قیمت: {product.price} تومان</span>
    </div>
  );
};

export default CardMaker;

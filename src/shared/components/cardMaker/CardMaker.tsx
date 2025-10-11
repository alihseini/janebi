import React from 'react';
import styles from './styles.module.css';
import { shortenTitle, makeSlug } from '../../utils/utils';
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

const CardMaker: React.FC<{ product: Product }> = ({ product }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    const slug = makeSlug(product.title);
    navigate(`/products/${product.id}/${slug}`); 
  };

  return (
    <div className={styles.card} onClick={handleClick}>
      <img src={product.image} alt={product.title} />
      <p>{shortenTitle(product.title)}</p>
      <span className={styles.price}>قیمت: {product.price} تومان</span>
    </div>
  );
};

export default CardMaker;

import React from 'react';
import styles from './styles.module.css';
import { shortenTitle } from '../../utils/utils';
import { useNavigate } from 'react-router';
import { useCartCache } from '../../../features/cart/services/useCartCache';
import ProductActions from '../actionButtons/ProductActions';

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
  fullWidth?: boolean;
}

const CardMaker: React.FC<CardMakerProps> = ({
  product,
  fullWidth = false,
}) => {
  const navigate = useNavigate();
  const { state, addProduct, removeProduct, increaseProduct, decreaseProduct } =
    useCartCache();

  const handleClick = () => {
    navigate(`/products/${product.id}`);
  };

  const cartProduct = state?.products?.find((p) => p.id === product.id);
  const count = cartProduct?.count || 0;

  return (
    <div
      className={`${styles.card} ${
        fullWidth ? styles.fullWidth : styles.fixedWidth
      }`}
    >
      <div className={styles.imageWrapper} onClick={handleClick}>
        <img src={product.image} alt={product.title} />
      </div>
      <p onClick={handleClick}>{shortenTitle(product.title)}</p>
      <span className={styles.price}>قیمت: {product.price} تومان</span>
      <ProductActions
        count={count}
        productId={product.id}
        addProduct={() => addProduct(product)}
        removeProduct={removeProduct}
        increaseProduct={increaseProduct}
        decreaseProduct={decreaseProduct}
      />
    </div>
  );
};

export default CardMaker;

import React from 'react';
import styles from './styles.module.css';
import { shortenTitle } from '../../utils/utils';
import { useNavigate } from 'react-router';
import { useCartCache } from '../../../features/cart/services/useCartCache';
import Icons from '../../icons';
import Button from '../button/Button';

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
      <div className={styles.actions}>
        {count === 0 && (
          <Button
            onClick={() => addProduct(product)}
            className={styles.addButton}
            svgSrc="bx-cart-add"
            color="white"
          />
        )}

        {count === 1 && (
          <div className={styles.counter}>
            <button
              className={styles.plusBtn}
              onClick={() => increaseProduct(product.id)}
            >
              +
            </button>
            <span className={styles.count}>{count}</span>
            <Button
              onClick={() => removeProduct(product.id)}
              className={styles.removeBtn}
              svgSrc="bx-trash"
              color="white"
              fontSize='1.2rem'
            />
          </div>
        )}

        {count > 1 && (
          <div className={styles.counter}>
            <button
              className={styles.plusBtn}
              onClick={() => increaseProduct(product.id)}
            >
              +
            </button>
            <span className={styles.count}>{count}</span>
            <button
              className={styles.minusBtn}
              onClick={() => decreaseProduct(product.id)}
            >
              -
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CardMaker;

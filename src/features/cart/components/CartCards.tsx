import React from 'react';
import styles from '../css/styles.module.css';
import { shortenTitle } from '../../../shared/utils/utils';
import ProductActions from '../../../shared/components/ActionButtons/ProductActions';
import { useNavigate } from 'react-router';
import type { Product } from '../types/cart';
interface IProps {
  products: Product[];
  onIncrease: (id: number) => void;
  onDecrease: (id: number) => void;
  onRemove: (id: number) => void;
  onAdd: (product: Product) => void;
}

const CartCards: React.FC<IProps> = ({
  products,
  onIncrease,
  onDecrease,
  onRemove,
  onAdd,
}) => {
  const navigate = useNavigate();
  const sumPrice = (price, count) => {
    return price * count;
  };
  const cardClickHandler = (id) => {
    navigate(`/products/${id}`);
  };
  return (
    <div className={styles.cartCardsWrapper}>
      <h2>سبد خرید شما</h2>
      {products.map((product) => (
        <div key={product.id} className={styles.cartCard}>
          <img
            src={product.image || '/placeholder.png'}
            alt={product.title}
            className={styles.cartImage}
            onClick={() => cardClickHandler(product.id)}
          />

          <div className={styles.cartInfo}>
            <h4 onClick={() => cardClickHandler(product.id)}>
              {shortenTitle(product.title)}
            </h4>
            <p>{product.price.toLocaleString()} تومان</p>
          </div>

          <div className={styles.cartTotalPrice}>
            مبلغ کل : {sumPrice(product.price, product.count)}
          </div>
          <ProductActions
            count={product.count}
            productId={product.id}
            addProduct={() => onAdd(product)}
            removeProduct={onRemove}
            increaseProduct={onIncrease}
            decreaseProduct={onDecrease}
          />
        </div>
      ))}
    </div>
  );
};

export default CartCards;

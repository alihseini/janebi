import React from 'react';
import styles from './styles.module.css';
import { useCartCache } from '../cart/services/useCartCache';
import CartCards from './components/CartCards';
import Checkout from './components/Checkout';

const Cart: React.FC = () => {
  const { state, increaseProduct, decreaseProduct, removeProduct, clearCart } =
    useCartCache();

  const { products = [], totalPrice, totalCount } = state || {};

  return (
    <div className={styles.cartContainer}>
      <h2 className={styles.title}>سبد خرید شما</h2>

      {products.length === 0 ? (
        <p className={styles.empty}>سبد خرید شما خالی است.</p>
      ) : (
        <div className={styles.cartContent}>
          <CartCards
            products={products}
            onIncrease={increaseProduct}
            onDecrease={decreaseProduct}
            onRemove={removeProduct}
          />
          <Checkout
            totalPrice={totalPrice}
            totalCount={totalCount}
            onClear={clearCart}
          />
        </div>
      )}
    </div>
  );
};

export default Cart;

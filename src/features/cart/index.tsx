import React from 'react';
import styles from './css/styles.module.css';
import { useCartCache } from '../cart/services/useCartCache';
import CartCards from './components/CartCards';
import Checkout from './components/Checkout';
import type { Product } from './types/cart';

const Cart: React.FC = () => {
  const { state, increaseProduct, decreaseProduct, removeProduct, clearCart } =
    useCartCache();

  const products: Product[] = state?.products ?? [];
  const totalPrice: number = state?.totalPrice ?? 0;
  const totalCount: number = state?.totalCount ?? 0;

  return (
    <div className={styles.cartContainer}>
      {products.length === 0 ? (
        <div className={styles.emptyCart}>
          <img src="/src/assets/images/cart-empty.svg" alt="cart" />
          <p>سبد خرید شما خالیست!</p>
        </div>
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

import React from 'react';
import styles from './css/styles.module.css';
import { useCartCache } from '../cart/services/useCartCache';
import CartCards from './components/CartCards';
import Checkout from './components/Checkout';
import type { Product } from './types/cart';
import Icons from '../../shared/icons';

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
          <div className={styles.checkoutSection}>
            <Checkout
              totalPrice={totalPrice}
              totalCount={totalCount}
              onClear={clearCart}
            />
            <div className={styles.bottomCheckout}>
              <p>
                کالا های موجود در سبد شما ثبت و رزرو نشده اند، برای ثبت سفارش
                مراحل بعدی را تکمیل کنید.
              </p>
              <div className={styles.bottomCheckoutBox}>
                <Icons name="bx-support" color="#0089ff" />
                <div>
                  <p>نیاز به پشتیبانی دارید؟</p>
                  <span>۰۲۱-۶۲۹۹۹۹۷۷</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;

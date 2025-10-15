import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router';
import styles from '../css/CartDrawer.module.css';
import Button from '../../../shared/components/button/Button';
import { useCartCache } from '../services/useCartCache';
import { shortenTitle } from '../../../shared/utils/utils';

const CartDrawer: React.FC = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { state, removeProduct } = useCartCache();

  const products = state?.products || [];
  const totalPrice = state?.totalPrice || 0;

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  if (location.pathname.includes('/cart')) return null;

  return (
    <div
      className={styles.cartWrapper}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <div className={styles.iconWrapper}>
        <Button svgSrc="bx-cart" size={40} onClick={() => navigate('/cart')} />
        <span className={styles.badge}>{state.totalCount}</span>
      </div>

      <div className={`${styles.drawer} ${open ? styles.open : ''}`}>
        {products.length === 0 ? (
          <div className={styles.emptyCart}>
            <img src="/src/assets/images/cart-empty.svg" alt="cart" />
            <p>سبد خرید شما خالی است!</p>
          </div>
        ) : (
          <>
            <h4>سبد خرید شما</h4>
            <div className={styles.items}>
              {products.map((p) => (
                <div key={p.id} className={styles.item}>
                  <img src={p.image} alt={p.id} />
                  <div className={styles.info}>
                    <p>{shortenTitle(p.title)}</p>
                    <span>تعداد:{p.count}</span>
                  </div>
                  <div className={styles.trashBadge}>
                    <Button
                      svgSrc="bx-trash"
                      onClick={() => removeProduct(p.id)}
                      size={20}
                      color="red"
                    />
                  </div>
                  <p className={styles.price}>{p.price} تومان</p>
                </div>
              ))}
            </div>
            <div className={styles.footer}>
              <p>
                جمع کل: <strong>{totalPrice.toLocaleString()} تومان</strong>
              </p>
              <Button
                text="مشاهده سبد خرید"
                className={styles.viewCartBtn}
                onClick={() => navigate('/cart')}
                color="white"
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CartDrawer;

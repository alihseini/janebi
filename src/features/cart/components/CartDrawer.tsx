import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router';
import styles from '../css/styles.module.css';
import Button from '../../../shared/components/Button/Button';
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
      className={styles.cartDrawerWrapper}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <div className={styles.cartIconWrapper}>
        <Button svgSrc="bx-cart" size={40} onClick={() => navigate('/cart')} />
        <span className={styles.drawerCartBadge}>{state.totalCount}</span>
      </div>

      <div className={`${styles.cartDrawer} ${open ? styles.drawerOpen : ''}`}>
        {products.length === 0 ? (
          <div className={styles.emptyDrawerCart}>
            <img src="/src/assets/images/cart-empty.svg" alt="cart" />
            <p>سبد خرید شما خالی است!</p>
          </div>
        ) : (
          <>
            <h4>سبد خرید شما</h4>
            <div className={styles.drawerItems}>
              {products.map((p) => (
                <div key={p.id} className={styles.drawerItem}>
                  <img src={p.image} alt={p.id} />
                  <div className={styles.drawerInfo}>
                    <p>{shortenTitle(p.title)}</p>
                    <span>تعداد:{p.count}</span>
                  </div>
                  <div className={styles.drawerTrashBadge}>
                    <Button
                      svgSrc="bx-trash"
                      onClick={() => removeProduct(p.id)}
                      size={20}
                      color="red"
                    />
                  </div>
                  <p className={styles.drawerPrice}>{p.price} تومان</p>
                </div>
              ))}
            </div>
            <div className={styles.drawerFooter}>
              <p>
                جمع کل: <strong>{totalPrice.toLocaleString()} تومان</strong>
              </p>
              <Button
                text="مشاهده سبد خرید"
                className={styles.viewDrawerCartBtn}
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

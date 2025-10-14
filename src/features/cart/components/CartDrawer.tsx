import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router';
import styles from '../css/CartDrawer.module.css';
import Button from '../../../shared/components/button/Button';
import { useCartCache } from '../services/useCartCache';

const CartDrawer: React.FC = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = useCartCache();

  const products = state?.products || [];
  const totalPrice = state?.totalPrice || 0;

  if (location.pathname.includes('/cart')) return null;

  return (
    <div
      className={styles.cartWrapper}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <div className={styles.iconWrapper}>
        <Button
          svgSrc="bx-cart"
          size={40}
          onClick={() => {
            navigate('/cart');
          }}
        />
        <span className={styles.badge}>{state.totalCount}</span>
      </div>
      <div className={`${styles.drawer} ${open ? styles.open : ''}`}>
        <h4>سبد خرید شما</h4>
        {products.length === 0 ? (
          <p className={styles.empty}>سبد خرید خالی است</p>
        ) : (
          <div className={styles.items}>
            {products.map((p) => (
              <div key={p.id} className={styles.item}>
                <img src={p.image || '/placeholder.png'} alt={p.name} />
                <div className={styles.info}>
                  <p>{p.name}</p>
                  <span>
                    {p.count} × {p.price.toLocaleString()} تومان
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className={styles.footer}>
          <p>
            جمع کل: <strong>{totalPrice.toLocaleString()} تومان</strong>
          </p>
          <Button
            text="مشاهده سبد خرید"
            className={styles.viewCartBtn}
            onClick={() => navigate('/cart')}
          />
        </div>
      </div>
    </div>
  );
};

export default CartDrawer;

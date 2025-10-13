import React from 'react';
import styles from '../css/Checkout.module.css';
import Button from '../../../shared/components/button/Button';

interface CheckoutProps {
  totalPrice: number;
  totalCount: number;
  onClear: () => void;
}

const Checkout: React.FC<CheckoutProps> = ({
  totalPrice,
  totalCount,
  onClear,
}) => {
  return (
    <div className={styles.checkoutWrapper}>
      <h3>خلاصه سبد خرید</h3>
      <p>
        تعداد کالا: <strong>{totalCount}</strong>
      </p>
      <p>
        مبلغ کل: <strong>{totalPrice.toLocaleString()} تومان</strong>
      </p>

      <div className={styles.actions}>
        <Button text="تسویه حساب" onClick={() => alert('در حال پرداخت...')} />
        <Button text="خالی کردن سبد" color="red" onClick={onClear} />
      </div>
    </div>
  );
};

export default Checkout;

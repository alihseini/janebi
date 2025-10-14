import React from 'react';
import styles from '../css/Checkout.module.css';
import Button from '../../../shared/components/button/Button';
import { toast } from 'react-toastify';

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
      <p className={styles.delivery}>
        نحوه ارسال : <span>رایگان</span>{' '}
      </p>

      <div className={styles.actions}>
        <Button className={styles.checkout} text="تسویه حساب" onClick={() => toast('در حال پرداخت...')} />
        <Button className={styles.emptyCart} text="خالی کردن سبد" color="red" onClick={onClear} />
      </div>
    </div>
  );
};

export default Checkout;

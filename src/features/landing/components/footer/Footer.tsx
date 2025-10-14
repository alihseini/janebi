import React from 'react';
import styles from '../../css/footer.module.css';

const Footer: React.FC = () => {
  return (
    <div className={styles.footer}>
      <div className={styles.topFooter}>
        <div>
          <img
            src="https://janebi.com/janebi/9fd2/uploads/theme/banner/guaranty.svg"
            alt="guaranty"
          />
          <p>ضمانت اصل بودن کالا</p>
          <span>تضمین اصالت گارانتی</span>
        </div>
        <div>
          <img
            src="https://janebi.com/janebi/9fd2/uploads/theme/banner/cart-return.svg"
            alt="cart"
          />
          <p>ضمانت بازگشت</p>
          <span>باز گرداندن کالا در 7 روز</span>
        </div>
        <div>
          <img
            src="https://janebi.com/janebi/9fd2/uploads/theme/banner/delivery-fast.svg"
            alt="delivery"
          />
          <p>تحویل اکسپرس</p>
          <span>24 ساعته در تهران</span>
        </div>
        <div>
          <img
            src="https://janebi.com/janebi/9fd2/uploads/theme/banner/hand-card.svg"
            alt="hand-card"
          />
          <p>پرداخت امن</p>
          <span>درگاه پرداخت مطمئن</span>
        </div>
      </div>
    </div>
  );
};

export default Footer;

import React from 'react';
import styles from '../css/styles.module.css';
import Button from '../../shared/components/Button/Button';
import Icons from '../../shared/icons';

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
      <div className={styles.mainFooter}>
        <div>
          <p>راهنمای خرید از جانبی</p>
          <ul>
            <li>ثبت سفارش</li>
            <li>رویه ارسال سفارشات</li>
            <li>پیگیری سفارش</li>
            <li>راهنمای پرداخت</li>
          </ul>
        </div>
        <div>
          <p>خدمات مشتریان</p>
          <ul>
            <li>پاسخ به سوالات متداول</li>
            <li>رویه بازگرداندن کالا</li>
            <li>شرایط استفاده</li>
            <li>حریم خصوصی</li>
          </ul>
        </div>
        <div>
          <p>جانبی</p>
          <ul>
            <li>درباره جانبی</li>
            <li>تماس با جانبی</li>
            <li>همکاری با جانبی</li>
            <li>شماره حساب های جانبی</li>
            <li>وبلاگ جانبی</li>
          </ul>
        </div>
        <div>
          <p>دریافت اپلیکیشن</p>
          <div className={styles.download}>
            <Button
              text="دانلود اپلیکیشن اندروید"
              svgSrc="Vector"
              className={styles.downloadButton}
            />
            <img
              src="https://janebi.com/janebi/9fd2/uploads/theme/banner/footer-appv2.webp"
              alt="footer"
            />
          </div>
        </div>
      </div>
      <div className={styles.bottomFooter}>
        <p>
          پاسخگوی شما هستیم : شنبه تا چهارشنبه<span> 9-17 </span>. پنجشنبه{' '}
          <span>9-14</span>
        </p>
        <div className={styles.bottomFooterBase}>
          <div className={styles.bottomInfo}>
            <div>
              <Icons name="bx-phone" color="#0089ff" /> 021-629999777
            </div>
            <div>
              <Icons name="bx-envelope" color="#0089ff" /> info@janebi.com
            </div>
          </div>
          <div>
            <Button svgSrc="telegram" />
            <Button svgSrc="insta" />
            <Button svgSrc="facebook" />
            <Button svgSrc="tweeter" />
            <Button svgSrc="linkedin" />
          </div>
          <div>
            <img
              src="https://janebi.com/janebi/9fd2/uploads/theme/banner/econ.svg"
              alt="econ"
            />
            <img
              src="https://janebi.com/janebi/9fd2/uploads/theme/banner/enamad.png"
              alt="etemad"
            />
            <img
              src="https://janebi.com/janebi/9fd2/uploads/theme/banner/anjoman.webp"
              alt="anjoman"
            />
            <img
              src="https://janebi.com/janebi/9fd2/uploads/theme/banner/samandehi.webp"
              alt="samandehi"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;

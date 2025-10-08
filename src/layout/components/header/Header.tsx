import React, { useEffect, useState } from 'react';
import styles from './styles.module.css';
import Input from '../../../shared/components/input/Input';
import Button from '../../../shared/components/button/Button';
import Icons from '../../../shared/icons';
import ShortDrawer from '../../../shared/components/shortDrawer/ShortDrawer';

const MainHeader: React.FC = () => {
  const [search, setSearch] = useState('');
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY && window.scrollY > 80) {
        setShowNavbar(false);
      } else {
        setShowNavbar(true);
      }
      setLastScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <header
      className={`${styles.headerWrapper} ${
        showNavbar ? styles.headerWhite : styles.headerGlass
      }`}
    >
      <div className={styles.topHeader}>
        <p>
          <span>ارسال رایگان </span>
          با اولین خرید از جانبی با کد : <span>FREE007</span>
        </p>
      </div>
      <div className={styles.mainHeader}>
        <img src="/src/assets/images/janebi-logo.svg" alt="logo" />
        <div className={styles.mainHeaderSearch}>
          <div className={styles.searchDiv}>
            <Input
              name="search"
              type="text"
              value={search}
              placeholder="دنبال چه لوازمی هستید؟"
              onChange={(e) => setSearch(e.target.value)}
              className={styles.searchInput}
            />
            <Button svgSrc="bx-search" className={styles.searchButton} />
          </div>
        </div>
        <div className={styles.mainHeaderLogin}>
          <ShortDrawer
            trigger={
              <div className={styles.loginTrigger}>
                <Icons name="bx-user" size={40} color="#999999" />
                <div>
                  <p>خوش آمدی</p>
                  <Button text="ورود به حساب کاربری" />
                </div>
              </div>
            }
            items={[
              { text: 'ورود / ثبت نام', svgSrc: 'bx-log-in' },
              { text: 'پیگیری سفارشات', svgSrc: 'bx-cart-add' },
            ]}
          />
        </div>
        <div className={styles.mainHeaderCart}>
          <Button svgSrc="bx-cart" size={40} />
        </div>
      </div>
      <div
        className={`${styles.navBar} ${
          showNavbar ? styles.navVisible : styles.navHidden
        }`}
      >
        <ShortDrawer
          trigger={
            <Button
              text="دسته بندی محصولات"
              svgSrc="bx-menu-alt-right"
              fontSize="1.1rem"
              className={styles.categoriButton}
              color="#fff"
            />
          }
          items={[
            { text: 'همه', svgSrc: 'bx-filter' },
            { text: 'الکترونیکی', svgSrc: 'null' },
            { text: 'جواهرات', svgSrc: 'null' },
            { text: 'لباس مردانه', svgSrc: 'null' },
            { text: 'لباس زنانه', svgSrc: 'null' },
          ]}
        />
        <Button text="پیشنهاد ویژه" color="#4b4b4b" fontSize="1.1rem" />
        <Button text="پر فروش ترین" color="#4b4b4b" fontSize="1.1rem" />
        <Button text="وبلاگ" color="#4b4b4b" fontSize="1.1rem" />
      </div>
    </header>
  );
};

export default MainHeader;

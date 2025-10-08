import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import styles from './styles.module.css';
import Input from '../../../shared/components/input/Input';
import Button from '../../../shared/components/button/Button';
import Icons from '../../../shared/icons';
import ShortDrawer from '../../../shared/components/shortDrawer/ShortDrawer';
import LoginModal from '../../../features/landing/components/loginModal/LoginModal';
import { useNavigate } from 'react-router';

const Header: React.FC = () => {
  const navigate = useNavigate();

  const [search, setSearch] = useState('');
  const [showNavbar, setShowNavbar] = useState(true);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [user, setUser] = useState<string | null>(null);

  useEffect(() => {
    const username = Cookies.get('username');
    if (username) setUser(username);
  }, []);

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

  const handleLogout = () => {
    Cookies.remove('token');
    Cookies.remove('username');
    setUser(null);
  };

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
          {user ? (
            <div className={styles.loggedInInfo}>
              <Icons name="bx-user" size={40} color="#999999" />
              <div>
                <p>سلام، {user}</p>
                <Button text="خروج" onClick={handleLogout} />
              </div>
            </div>
          ) : (
            <>
              <ShortDrawer
                trigger={
                  <div className={styles.loginTrigger}>
                    <Icons name="bx-user" size={40} color="#999999" />
                    <div>
                      <p>خوش آمدی</p>
                      <Button
                        text="ورود به حساب کاربری"
                        onClick={() => setShowLoginModal(true)}
                      />
                    </div>
                  </div>
                }
                items={[
                  {
                    text: 'ورود / ثبت نام',
                    svgSrc: 'bx-log-in',
                    onClick: () => setShowLoginModal(true),
                  },
                  { text: 'پیگیری سفارشات', svgSrc: 'bx-cart-add' },
                ]}
              />{' '}
              <LoginModal
                isVisible={showLoginModal}
                onClose={() => setShowLoginModal(false)}
                onLogin={(username: string) => setUser(username)}
              />
            </>
          )}
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
              onClick={() => navigate('/products')}
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

export default Header;

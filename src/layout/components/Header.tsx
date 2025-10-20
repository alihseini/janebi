import React, { useEffect, useState } from 'react';
import styles from '../css/styles.module.css';
import Input from '../../shared/components/input/Input';
import Button from '../../shared/components/button/Button';
import Icons from '../../shared/icons';
import ShortDrawer from '../../shared/components/shortDrawer/ShortDrawer';
import { useNavigate, useLocation, createSearchParams } from 'react-router';
import { categoryList } from '../../features/products/json/categoryList';
import CartDrawer from '../../features/cart/components/CartDrawer';
import LoginModal from '../../features/landing/components/LoginModal';

const Header: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [search, setSearch] = useState(() => {
    const params = new URLSearchParams(location.search);
    return params.get('search') || '';
  });

  const [selectedCategory, setSelectedCategory] = useState(() => {
    const params = new URLSearchParams(location.search);
    return params.get('filter') || 'all';
  });

  const [showNavbar, setShowNavbar] = useState(true);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [user, setUser] = useState<string | null>(null);

  // 🔹 چک کردن وضعیت کاربر از localStorage در بارگذاری اولیه
  useEffect(() => {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('username');
    if (token && username) setUser(username);
  }, []);

  // 🔹 کنترل نمایش یا مخفی شدن هدر هنگام اسکرول
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

  // 🔹 همگام‌سازی سرچ و فیلتر با URL
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    setSearch(params.get('search') || '');
    setSelectedCategory(params.get('filter') || 'all');
  }, [location.search]);

  const updateURL = (newSearch: string, newCategory: string) => {
    const params: any = {};
    if (newSearch.trim() !== '') params.search = newSearch.trim();
    if (newCategory !== 'all') params.filter = newCategory;

    navigate({
      pathname: '/products',
      search: `?${createSearchParams(params)}`,
    });
  };

  const handleSearch = () => {
    updateURL(search, selectedCategory);
  };

  const handleCategoryClick = (value: string) => {
    setSelectedCategory(value);
    updateURL(search, value);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    setUser(null);
  };

  return (
    <div
      className={`${styles.headerWrapper} ${
        showNavbar ? styles.headerWhite : styles.headerGlass
      }`}
    >
      <div className={styles.topHeader}>
        ارسال <span>رایگان</span> شد! فرصت محدود
      </div>

      <div className={styles.mainHeader}>
        <img
          src="/src/assets/images/janebi-logo.svg"
          alt="logo"
          style={{ cursor: 'pointer' }}
          onClick={() => navigate('/')}
        />

        <div className={styles.mainHeaderSearch}>
          <div className={styles.searchDiv}>
            <Input
              name="search"
              type="text"
              value={search}
              placeholder="دنبال چه لوازمی هستید؟"
              onChange={(e) => setSearch(e.target.value)}
              className={styles.searchInput}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            />
            <Button
              svgSrc="bx-search"
              className={styles.searchButton}
              onClick={handleSearch}
            />
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
                    <div className={styles.loginTriggerText}>
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
              />
              <LoginModal
                isVisible={showLoginModal}
                onClose={() => setShowLoginModal(false)}
                onLoginSuccess={() => {
                  const username = localStorage.getItem('username');
                  setUser(username);
                }}
              />
            </>
          )}
        </div>

        <div className={styles.mainHeaderCart}>
          <CartDrawer />
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
          items={categoryList.map((cat) => ({
            text: cat.label,
            svgSrc: cat?.svgSrc,
            onClick: () => handleCategoryClick(cat.value),
          }))}
        />

        <Button text="پیشنهاد ویژه" color="#4b4b4b" fontSize="1.1rem" />
        <Button text="پر فروش ترین" color="#4b4b4b" fontSize="1.1rem" />
        <Button text="وبلاگ" color="#4b4b4b" fontSize="1.1rem" />
      </div>
    </div>
  );
};

export default Header;

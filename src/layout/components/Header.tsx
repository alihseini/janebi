import React, { useEffect, useState } from 'react';
import styles from '../css/styles.module.css';
import Input from '../../shared/components/Input/Input';
import Button from '../../shared/components/Button/Button';
import CartDrawer from '../../features/cart/components/CartDrawer';
import MobileDrawer from './MobileDrawer';
import LoginModal from './LoginModal';
import { useNavigate, useLocation, createSearchParams } from 'react-router';
import { toast } from 'react-toastify';

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

  const [user, setUser] = useState<string | null>(null);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 560);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [showNavbar, setShowNavbar] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('username');
    if (token && username) setUser(username);
  }, []);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 560);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
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

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    setSearch(params.get('search') || '');
    setSelectedCategory(params.get('filter') || 'all');
  }, [location.search]);

  const updateURL = (newSearch: string, newCategory: string) => {
    const params: any = {};
    if (newSearch.trim()) params.search = newSearch.trim();
    if (newCategory !== 'all') params.filter = newCategory;
    params.minPrice = localStorage.getItem('minPrice') || '0';
    params.maxPrice = localStorage.getItem('maxPrice') || '1000';

    navigate({
      pathname: '/products',
      search: `?${createSearchParams(params)}`,
    });
  };

  const handleSearch = () => updateURL(search, selectedCategory);
  const handleCategoryClick = (value: string) => {
    setSelectedCategory(value);
    updateURL(search, value);
  };

  const handleCategoryButtonClick = () => {
    const minPrice = localStorage.getItem('minPrice') || '0';
    const maxPrice = localStorage.getItem('maxPrice') || '1000';
    navigate({
      pathname: '/products',
      search: `?minPrice=${minPrice}&maxPrice=${maxPrice}`,
    });
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    setUser(null);
    toast.success('با موفقیت خارج شدید!', {
      position: 'top-center',
      autoClose: 3000,
    });
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

      {isMobile ? (
        <>
          <div className={styles.mobileHeader}>
            <Button
              svgSrc="bx-menu-alt-right"
              onClick={() => setDrawerOpen(true)}
            />
            <img
              src="/src/assets/images/janebi-logo.svg"
              alt="logo"
              className={styles.mobileLogo}
              onClick={() => navigate('/')}
            />
            <CartDrawer />
          </div>

          <div
            className={`${styles.mobileSearchBar} ${
              showNavbar ? styles.navVisible : styles.navHidden
            }`}
          >
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

          <MobileDrawer
            open={drawerOpen}
            onClose={() => setDrawerOpen(false)}
            user={user}
            onLogout={handleLogout}
            onLoginClick={() => {
              setShowLoginModal(true); 
              setDrawerOpen(false); 
            }}
            onCategoryClick={(value) => updateURL(search, value)}
          />
        </>
      ) : (
        <>
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
                  <div>
                    <p>سلام، {user}</p>
                    <Button text="خروج" onClick={handleLogout} />
                  </div>
                </div>
              ) : (
                <>
                  <Button
                    text="ورود به حساب کاربری"
                    onClick={() => setShowLoginModal(true)}
                  />
                </>
              )}
            </div>

            <div className={styles.mainHeaderCart}>
              <CartDrawer />
            </div>
          </div>
        </>
      )}
      <LoginModal
        isVisible={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onLoginSuccess={() => setUser(localStorage.getItem('username'))}
      />
    </div>
  );
};

export default Header;

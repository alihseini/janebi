import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router';
import Header from './components/header/Header';
import styles from './style.module.css';
import Footer from './components/footer/Footer';

const MainLayout: React.FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname]);
  return (
    <>
      <header className={styles.fixedHeader}>
        <Header />
      </header>

      <main className={styles.mainContent}>
        <Outlet />
      </main>

      <Footer />
    </>
  );
};

export default MainLayout;

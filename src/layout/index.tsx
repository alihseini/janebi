import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router';
import Header from './components/Header';
import styles from './css/styles.module.css';
import Footer from './components/Footer';

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

      <footer className={styles.fullFooter}>
        <Footer />
      </footer>
    </>
  );
};

export default MainLayout;

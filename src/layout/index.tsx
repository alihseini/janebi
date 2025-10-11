import React from 'react';
import { Outlet } from 'react-router';
import Header from './components/header/Header';
import styles from './style.module.css';
import Footer from './components/footer/Footer';

const MainLayout: React.FC = () => {
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

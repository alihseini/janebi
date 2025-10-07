import React from 'react';
import { Outlet } from 'react-router';
import TopHeader from './components/top-header/TopHeader';
import MainHeader from './components/header/Header';
import styles from './style.module.css';

const MainLayout: React.FC = () => {
  return (
    <>
      <header className={styles.fixedHeader}>
        <MainHeader />
      </header>

      <main className={styles.mainContent}>
        <Outlet />
      </main>

      <footer>
        <p>© 2025 My Shop. All rights reserved.</p>
      </footer>
    </>
  );
};

export default MainLayout;

import React from 'react';
import { Outlet } from 'react-router';
import Header from './components/header/Header';
import styles from './style.module.css';

const MainLayout: React.FC = () => {
  return (
    <>
      <header className={styles.fixedHeader}>
        <Header />
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

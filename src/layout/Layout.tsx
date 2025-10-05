import React from 'react';
import { Outlet } from 'react-router';
import TopHeader from './components/top-header/TopHeader';
import MainHeader from './components/main-header/MainHeader';
import Navbar from './components/navbar/NavBar';

const MainLayout: React.FC = () => {
  return (
    <div className="app-container">
      <TopHeader />
      <MainHeader />
      <Navbar />
      <main className="main-content">
        <Outlet />
      </main>
      <footer className="footer">
        <p>© 2025 My Shop. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default MainLayout;

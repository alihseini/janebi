import React from 'react';
import { Outlet } from 'react-router';
import TopHeader from './components/top-header/TopHeader';
import MainHeader from './components/main-header/MainHeader';

const MainLayout: React.FC = () => {
  return (
    <div>
      <TopHeader />
      <MainHeader />
      <main>
        <Outlet />
      </main>
      <footer>
        <p>© 2025 My Shop. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default MainLayout;

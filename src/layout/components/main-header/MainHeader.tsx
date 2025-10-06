import React from 'react';
import styles from './MainHeader.module.css';

const MainHeader: React.FC = () => {
  return (
    <div className={styles.mainHeader}>
      <img src="/src/assets/images/janebi-logo.svg" alt="logo" />
      <div>
        <div></div>
      </div>
    </div>
  );
};

export default MainHeader;

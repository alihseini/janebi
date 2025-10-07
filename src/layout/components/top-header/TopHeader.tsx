import React from 'react';
import styles from './styles.module.css';

const TopHeader: React.FC = () => {
  return (
    <div className={styles.topHeader}>
      <p>
        <span>ارسال رایگان </span>با اولین خرید از جانبی با کد :{' '}
        <span>FREE007</span>
      </p>
    </div>
  );
};

export default TopHeader;

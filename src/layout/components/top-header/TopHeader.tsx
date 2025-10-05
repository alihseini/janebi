import React from 'react';
import styles from './TopHeader.module.css';

const TopHeader: React.FC = () => {
  return (
    <div className={styles.topHeader}>
      <p>
        <span>ارسال رایگان </span>با اولین خرید از جانبی با کد :{' '}
        <span>aaaa</span>
      </p>
    </div>
  );
};

export default TopHeader;

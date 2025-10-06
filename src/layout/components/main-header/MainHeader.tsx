import React, { useState } from 'react';
import styles from './MainHeader.module.css';
import Input from '../../../shared/components/input/Input';
import Button from '../../../shared/components/button/Button';

const MainHeader: React.FC = () => {
  const [search, setSearch] = useState('');
  return (
    <div className={styles.mainHeader}>
      <img src="/src/assets/images/janebi-logo.svg" alt="logo" />
      <div className={styles.mainHeaderSearch}>
        <div className={styles.searchDiv}>
          <Input
            name="search"
            type="text"
            value={search}
            placeholder="دنبال چه لوازمی هستید؟"
            onChange={(e) => setSearch(e.target.value)}
            className={styles.searchInput}
          />
          <Button svgSrc="bx-search" className={styles.searchButton} />
        </div>
        <div>
          <Button text="تست" />
          <Button text="تست" />
          <Button text="تست" />
          <Button text="تست" />
          <Button text="تست" />
          <Button text="تست" />
        </div>
      </div>
      <div className={styles.mainHeaderLogin}>
        <Button svgSrc="bx-user" size={40} className={styles.loginButton} />
        <div>
          <p>خوش آمدی</p>
          <Button text="ورود به حساب کاربری" />
        </div>
      </div>
      <div className={styles.mainHeaderCart}>
        <Button svgSrc="bx-cart" size={40} />
      </div>
    </div>
  );
};

export default MainHeader;

import React, { useState } from 'react';
import styles from './MainHeader.module.css';
import Input from '../../../shared/components/input/Input';
import Button from '../../../shared/components/button/Button';
import Icons from '../../../shared/icons';

const MainHeader: React.FC = () => {
  const [search, setSearch] = useState('');
  return (
    <div className={styles.fullHeader}>
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
          <Icons name="bx-user" size={40} color="#999999" />
          <div>
            <p>خوش آمدی</p>
            <Button text="ورود به حساب کاربری" />
          </div>
        </div>
        <div className={styles.mainHeaderCart}>
          <Button svgSrc="bx-cart" size={40} />
        </div>
      </div>
      <div className={styles.navBar}>
        <Button
          text="دسته بندی محصولات"
          svgSrc="bx-menu-alt-right"
          fontSize="1.1rem"
          className={styles.categoriButton}
          color="#fff"
        />
        <Button text="پیشنهاد ویژه" color="#4b4b4b" fontSize="1.1rem" />
        <Button text="پر فروش ترین" color="#4b4b4b" fontSize="1.1rem" />
        <Button text="وبلاگ" color="#4b4b4b" fontSize="1.1rem" />
      </div>
    </div>
  );
};

export default MainHeader;

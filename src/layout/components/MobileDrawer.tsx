import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import styles from '../css/styles.module.css';
import Button from '../../shared/components/Button/Button';
import { categoryList } from '../../features/products/json/categoryList';

interface MobileDrawerProps {
  open: boolean;
  onClose: () => void;
  user: string | null;
  onLogout: () => void;
  onLoginClick: () => void;
  onCategoryClick: (value: string) => void;
}

const MobileDrawer: React.FC<MobileDrawerProps> = ({
  open,
  onClose,
  user,
  onLogout,
  onLoginClick,
  onCategoryClick,
}) => {
  const [expandedCategory, setExpandedCategory] = useState(false);


  const toggleCategory = () => setExpandedCategory(!expandedCategory);

  return ReactDOM.createPortal(
    <div className={`${open? styles.mobileDrawerBackdrop : styles.mobileDrawerBackdropClose}`} onClick={onClose}>
      <div
        className={`${
          open ? styles.mobileDrawerOpen : styles.mobileDrawerClosed
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.drawerHeader}>
          <p>جانبی</p>
          <Button svgSrc="bx-x" onClick={onClose} />
        </div>
        <div className={styles.drawerUser}>
          {user ? (
            <>
              <p>سلام، {user}</p>
              <Button text="خروج" onClick={onLogout} />
            </>
          ) : (
            <Button text="ورود / ثبت‌نام" onClick={onLoginClick} color="#000" />
          )}
        </div>
        <div>
          <Button
            text="دسته‌بندی محصولات"
            svgSrc={expandedCategory ? 'bx-chevron-up' : 'bx-chevron-down'}
            onClick={toggleCategory}
            className={styles.catButton}
          />
          <div
            className={`${styles.drawerSubCategories} ${
              expandedCategory ? styles.showCatList : styles.notShowCatList
            }`}
          >
            {categoryList.map((cat) => (
              <Button
                key={cat.value}
                text={cat.label}
                svgSrc={cat.svgSrc}
                onClick={() => {
                  onCategoryClick(cat.value);
                  onClose();
                }}
              />
            ))}
          </div>
        </div>
        <div className={styles.drawerLinks}>
          <Button text="پیشنهاد ویژه" color="#4b4b4b" />
          <Button text="پر فروش ترین" color="#4b4b4b" />
          <Button text="وبلاگ" color="#4b4b4b" />
        </div>
      </div>
    </div>,
    document.body
  );
};

export default MobileDrawer;

import React from 'react';
import styles from './ShortDrawer.module.css';
import Button from '../button/Button';

interface ShortDrawerProps {
  items: {
    text: string;
    color?: string;
    onClick?: () => void;
    svgSrc?: string;
  }[];
  isVisible: boolean;
}

const ShortDrawer: React.FC<ShortDrawerProps> = ({ items, isVisible }) => {
  return (
    <div className={`${styles.drawer} ${isVisible ? styles.show : ''}`}>
      {items.map((item, index) => (
        <Button
          key={index}
          text={item.text}
          fontSize='0.9rem'
          svgSrc={item.svgSrc}
          color={item.color || '#333'}
          onClick={item.onClick}
          className={styles.drawerButton}
        />
      ))}
    </div>
  );
};

export default ShortDrawer;

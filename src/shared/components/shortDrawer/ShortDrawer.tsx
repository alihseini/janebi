import React, { useState } from 'react';
import styles from './styles.module.css';
import Icons from '../../icons';

interface ShortDrawerProps {
  trigger: React.ReactNode;
  items: { text: string; svgSrc: string; onClick?: () => void }[];
}

const ShortDrawer: React.FC<ShortDrawerProps> = ({
  trigger,
  items,
}) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div
      className={styles.wrapper}
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      <div className={styles.trigger}>{trigger}</div>

      <div className={`${styles.drawer} ${isVisible ? styles.show : ''}`}>
        {items.map((item, index) => (
          <button
            key={index}
            className={styles.drawerButton}
            onClick={item.onClick}
          >
            <Icons name={item.svgSrc} size={20} color="#555" />
            <span>{item.text}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ShortDrawer;

import React from 'react';
import styles from './styles.module.css';

interface BannerMakerProps {
  images: string[];
}

const BannerMaker: React.FC<BannerMakerProps> = ({ images }) => {
  return (
    <div className={styles.bannerContainer}>
      {images.map((src, index) => (
        <div key={index} className={styles.bannerItem}>
          <img src={src} alt={`Banner ${index + 1}`} />
        </div>
      ))}
    </div>
  );
};

export default BannerMaker;

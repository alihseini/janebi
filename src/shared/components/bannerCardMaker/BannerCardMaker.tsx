import React from 'react';
import styles from './styles.module.css';

interface BannerCardMaker {
  title: string;
  mainImage: string;
  smallImages: string[];
}

const BannerCardMaker: React.FC<BannerCardMaker> = ({
  title,
  mainImage,
  smallImages,
}) => {
  return (
    <div className={styles.card}>
      <h3 className={styles.title}>{title}</h3>
      <div className={styles.imagesContainer}>
        <img src={mainImage} alt="main" />
        <div className={styles.smallImages}>
          <img src={smallImages[0]} alt="1" />
          <img src={smallImages[1]} alt="2" />
        </div>
      </div>
    </div>
  );
};

export default BannerCardMaker;

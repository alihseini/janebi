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
        <div className={styles.mainImage}>
          <img src={mainImage} alt="main" />
        </div>
        <div className={styles.smallImages}>
          {smallImages.slice(0, 2).map((img, i) => (
            <img key={i} src={img} alt={`small-${i}`} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default BannerCardMaker;

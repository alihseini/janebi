import React from 'react';
import ImageSwiper from './components/imageSweaper/imageSwiper';
import styles from './styles.module.css';

const images = [
  'https://janebi.com/janebi/9fd2/files/normal/496502.jpg',
  'https://janebi.com/janebi/9fd2/files/normal/496501.jpg',
  'https://janebi.com/janebi/9fd2/files/normal/496499.jpg',
  'https://janebi.com/janebi/9fd2/files/normal/496497.jpg',
  'https://janebi.com/janebi/9fd2/files/normal/496495.jpg',
  'https://janebi.com/janebi/9fd2/files/normal/496498.jpg',
  'https://janebi.com/janebi/9fd2/files/normal/496494.jpg',
];

const Landing: React.FC = () => (
  <div className={styles.container}>
    <ImageSwiper images={images} />
  </div>
);

export default Landing;

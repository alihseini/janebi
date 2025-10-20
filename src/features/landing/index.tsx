import React from 'react';
import ImageSwiper from './components/imageSwiper';
import styles from './css/styles.module.css';
import CardList from '../../shared/components/cardList/CardList';
import BannerMaker from '../../shared/components/bannerMaker/BannerMaker';
import TripleBannerCards from './components/TripleBannerCards';
import FourBanner from './components/FourBanners';
import { useProducts } from '../products/services/useProducts';

const images = [
  'https://janebi.com/janebi/9fd2/files/normal/496502.jpg',
  'https://janebi.com/janebi/9fd2/files/normal/496501.jpg',
  'https://janebi.com/janebi/9fd2/files/normal/496499.jpg',
  'https://janebi.com/janebi/9fd2/files/normal/496497.jpg',
  'https://janebi.com/janebi/9fd2/files/normal/496495.jpg',
  'https://janebi.com/janebi/9fd2/files/normal/496498.jpg',
  'https://janebi.com/janebi/9fd2/files/normal/496494.jpg',
];

const imageBanner = [
  'https://janebi.com/janebi/9fd2/uploads/birthday404/fix-banner_powerbank.jpg',
  'https://janebi.com/janebi/9fd2/uploads/birthday404/fix-banner_headphone.jpg',
];

const Landing: React.FC = () => {
  const { data: products, isLoading, isError, error } = useProducts();

  if (isLoading) return <p>در حال بارگذاری...</p>;
  if (isError) return <p>خطا در دریافت داده: {(error as Error).message}</p>;

  return (
    <div className={styles.container}>
      <ImageSwiper images={images} />
      <CardList data={products} title="اجناس" button="نمایش همه" />
      <BannerMaker images={imageBanner} />
      <TripleBannerCards />
      <CardList data={products} title="اجناس" button="نمایش همه" />
      <CardList data={products} title="اجناس" button="نمایش همه" />
      <FourBanner />
      <CardList data={products} title="اجناس" button="نمایش همه" />
      <CardList data={products} title="اجناس" button="نمایش همه" />
      <CardList data={products} title="اجناس" button="نمایش همه" />
      <CardList data={products} title="اجناس" button="نمایش همه" />
    </div>
  );
};

export default Landing;

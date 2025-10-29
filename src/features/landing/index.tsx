import React from 'react';
import ImageSwiper from './components/imageSwiper';
import styles from './css/styles.module.css';
import CardList from '../../shared/components/CardList/CardList';
import BannerMaker from '../../shared/components/BannerMaker/BannerMaker';
import TripleBannerCards from './components/TripleBannerCards';
import FourBanner from './components/FourBanners';
import { useProducts } from '../products/services/useProducts';
import { imageBanner, images } from './json/images';

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

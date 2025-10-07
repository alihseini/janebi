import React from 'react';
import ImageSwiper from './components/imageSwiper/imageSwiper';
import styles from './styles.module.css';
import { fetchProducts } from './services/services';
import { useQuery } from '@tanstack/react-query';
import CartList from '../../shared/components/cartList/CartList';

const images = [
  'https://janebi.com/janebi/9fd2/files/normal/496502.jpg',
  'https://janebi.com/janebi/9fd2/files/normal/496501.jpg',
  'https://janebi.com/janebi/9fd2/files/normal/496499.jpg',
  'https://janebi.com/janebi/9fd2/files/normal/496497.jpg',
  'https://janebi.com/janebi/9fd2/files/normal/496495.jpg',
  'https://janebi.com/janebi/9fd2/files/normal/496498.jpg',
  'https://janebi.com/janebi/9fd2/files/normal/496494.jpg',
];

const Landing: React.FC = () => {
  const {
    data: products,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts,
  });

  if (isLoading) return <p>در حال بارگذاری...</p>;
  if (isError) return <p>خطا در دریافت داده: {(error as Error).message}</p>;

  return (
    <div className={styles.container}>
      <ImageSwiper images={images} />
      <CartList data={products} title="اجناس" button="نمایش همه" />
    </div>
  );
};

export default Landing;

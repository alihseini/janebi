import { useParams } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import styles from './productDetails.module.css';

export default function ProductDetails() {
  const { id } = useParams();


  if (isLoading) return <p>Loading...</p>;
  if (isError || !data) return <p>Something went wrong.</p>;

  return (
    <div className={styles.container}>
      <img src={data.image} alt={data.title} width="200" />
      <div className={styles.details}>
        <h2>{data.title}</h2>
        <p className={styles.description}>{data.description}</p>
        <p>
          <span>قیمت: </span>
          {data.price} تومان
        </p>
      </div>
    </div>
  );
}

import { useParams } from 'react-router';
import styles from '../css/productDetails.module.css';
import { useProductById } from '../services/useProducts';

export default function ProductDetails() {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading, isError } = useProductById(id || '');

  if (isLoading) return <p>Loading...</p>;
  if (isError || !data) return <p>Something went wrong.</p>;

  return (
    <div className={styles.container}>
      <img src={data.image} alt={data.title} width={200} />
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

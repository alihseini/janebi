import { useParams } from 'react-router';
import styles from '../css/styles.module.css';
import { useProductById } from '../services/useProducts';
import { useCartCache } from '../../cart/services/useCartCache';
import ProductActions from '../../../shared/components/ActionButtons/ProductActions';

export default function ProductDetails() {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading, isError } = useProductById(id || '');

  const { state, addProduct, removeProduct, increaseProduct, decreaseProduct } =
    useCartCache();

  const cartProduct = state?.products?.find((p) => p.id === data?.id);
  const count = cartProduct?.count || 0;

  if (isLoading) return <p>Loading...</p>;
  if (isError || !data) return <p>Something went wrong.</p>;

  return (
    <div className={styles.detailContainer}>
      <img src={data.image} alt={data.title} width={200} />
      <div className={styles.detailsInfo}>
        <h2>{data.title}</h2>
        <p className={styles.description}>{data.description}</p>
        <p>
          <span>قیمت: </span>
          {data.price} تومان
        </p>
        <ProductActions
          count={count}
          productId={data.id}
          addProduct={() => addProduct(data)}
          removeProduct={removeProduct}
          increaseProduct={increaseProduct}
          decreaseProduct={decreaseProduct}
          isLTR={true}
        />
      </div>
    </div>
  );
}

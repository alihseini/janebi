import { useParams } from 'react-router';
import { useEffect, useState } from 'react';
import CardList from '../../../shared/components/CardList/CardList';
import MainDetails from '../components/MainDetails';
import styles from '../css/styles.module.css';
import { useProductById, useProducts } from '../services/useProducts';

export default function ProductDetails() {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading, isError } = useProductById(id || '');
  const { data: products = [] } = useProducts();

  const [filteredCards, setFilteredCards] = useState<any[]>([]);

  useEffect(() => {
    if (!data || !products.length) return; 
    const temp = products.filter(
      (item) => item?.category === data?.category && item?.id !== data?.id
    );
    setFilteredCards(temp);
  }, [data, products]);

  if (isLoading) return <p>Loading...</p>;
  if (isError || !data) return <p>Something went wrong.</p>;

  return (
    <div className={styles.detailsPage}>
      <MainDetails data={data} />
      <CardList data={filteredCards} title="محصولات مرتبط" />
    </div>
  );
}

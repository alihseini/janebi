import { useParams } from 'react-router';
import CardList from '../../../shared/components/CardList/CardList';
import MainDetails from '../components/MainDetalis';
import styles from '../css/styles.module.css';
import { useProductById, useProducts } from '../services/useProducts';
import { useEffect, useState } from 'react';

export default function ProductDetails() {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading, isError } = useProductById(id || '');
  const { data: products = [] } = useProducts();

  const [filteredCards, setFilteredCards] = useState([]);

  useEffect(() => {
    let temp = products.filter((item) => item.category === data.category);
    setFilteredCards(temp);
  }, []);

  if (isLoading) return <p>Loading...</p>;
  if (isError || !data) return <p>Something went wrong.</p>;
  return (
    <div className={styles.detailsPage}>
      <MainDetails data={data} />
      <CardList data={filteredCards} title="محصولات مرتبط" />
    </div>
  );
}

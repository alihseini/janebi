import React from 'react';
import { useSearchParams } from 'react-router';
import { useProducts } from '../services/useProducts';
import Filtering from '../components/Filtering';
import Cards from '../components/Cards';

const ProductsList: React.FC = () => {
  const { data: products = [], isLoading, isError } = useProducts();

  const [searchParams] = useSearchParams();
  const filter = searchParams.get('filter') || '';
  const search = searchParams.get('search') || '';

  const filteredProducts = React.useMemo(() => {
    let tempProducts = products;

    if (filter) {
      tempProducts = tempProducts.filter(
        (p) => p.category.toLowerCase() === filter.toLowerCase()
      );
    }

    if (search) {
      tempProducts = tempProducts.filter((p) =>
        p.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    return tempProducts;
  }, [products, filter, search]);

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Something went wrong.</p>;

  return (
    <>
      <Filtering />
      <Cards data={filteredProducts} />
    </>
  );
};

export default ProductsList;

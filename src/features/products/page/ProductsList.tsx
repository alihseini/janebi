import React, { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router';
import { fetchProducts } from '../../landing/services/services';
import Cards from '../components/cards/Cards';
import Filtering from '../components/filtering/Filtering';

const ProductsList: React.FC = () => {
  const {
    data: products,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts,
  });

  const [searchParams] = useSearchParams();
  const filter = searchParams.get('filter') || '';
  const search = searchParams.get('search') || '';

  const [filteredProducts, setFilteredProducts] = useState(products);

  useEffect(() => {
    if (!products) return;

    let tempProducts = products;

    if (filter) {
      tempProducts = tempProducts.filter((p) =>
        p.category.toLowerCase().includes(filter.toLowerCase())
      );
    }

    if (search) {
      tempProducts = tempProducts.filter((p) =>
        p.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    setFilteredProducts(tempProducts);
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

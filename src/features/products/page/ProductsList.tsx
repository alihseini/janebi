import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router';
import Cards from '../components/cards/Cards';
import Filtering from '../components/filtering/Filtering';
import { useProducts } from '../services/useProducts';

const ProductsList: React.FC = () => {
  const { data: products = [], isLoading, isError } = useProducts();

  const [searchParams] = useSearchParams();
  const filter = searchParams.get('filter') || '';
  const search = searchParams.get('search') || '';

  const [filteredProducts, setFilteredProducts] = useState(products);

  useEffect(() => {
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

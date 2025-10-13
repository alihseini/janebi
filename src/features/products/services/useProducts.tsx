// useProducts.tsx
import { useQuery } from '@tanstack/react-query';
import { fetchService } from '../../../config/fetchServices';

const getProducts = async () => {
  return await fetchService('GET', 'products');
};

const getProductById = async (id: string | number) => {
  return await fetchService('GET', `products/${id}`);
};

export const useProducts = () => {
  return useQuery({
    queryKey: ['products'],
    queryFn: getProducts,
  });
};

export const useProductById = (id?: string | number) => {
  return useQuery({
    queryKey: ['product', id],
    queryFn: () => getProductById(id!),
  });
};

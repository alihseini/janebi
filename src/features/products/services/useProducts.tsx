import { useQuery } from '@tanstack/react-query';
import type { UseQueryResult } from '@tanstack/react-query';
import { fetchService } from '../../../config/fetchServices';
import type { Product } from '../../../shared/types/types';

const getProducts = async (): Promise<Product[]> => {
  return await fetchService('GET', 'products');
};

const getProductById = async (id: string | number): Promise<Product> => {
  return await fetchService('GET', `products/${id}`);
};

export const useProducts = (): UseQueryResult<Product[], Error> => {
  return useQuery<Product[], Error>({
    queryKey: ['products'],
    queryFn: getProducts,
  });
};

export const useProductById = (
  id?: string | number
): UseQueryResult<Product, Error> => {
  return useQuery<Product, Error>({
    queryKey: ['product', id],
    queryFn: () => getProductById(id!),
  });
};

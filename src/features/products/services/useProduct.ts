import { useQuery } from '@tanstack/react-query';

export const fetchProductById = async (id:string) => {
  const res = await fetch(`https://fakestoreapi.com/products/${id}`);
  if (!res.ok) throw new Error('Failed to fetch product');
  return res.json();
};

export const useProduct = () => {
  const useProductById = (id: string) => {
    return useQuery({
      queryKey: ['product', id],
      queryFn: () => fetchProductById(id!),
      staleTime: 1000 * 60 * 5,
    });
  };

  const useProductList = () => {
    return useQuery;
  };

  return {
    useProductById,
    useProductList,
  };
};

import { useQuery, useQueryClient } from '@tanstack/react-query';

interface IState {
  products: { id: number; name: string }[];
  price: number;
}
export const useCartCache = () => {
  const queryClient = useQueryClient();
  const QUERY_KEY: any = ['cart_state'];
  const initisalState = {
    products: [],
    price: 0,
  };

  const { data } = useQuery<IState>({
    queryKey: QUERY_KEY,
    queryFn: () => initisalState,
  });

  console.log(data);

  const addProduct = (newProducts: any) => {
    console.log(newProducts);

    queryClient.setQueryData(QUERY_KEY, (old: any) => {
      const newSate = {
        ...old,
        products: [...old?.products, { ...newProducts, count: 1 }],
      };
      console.log(newSate);

      return newSate;
    });
  };

  const removeProduct = () => {};

  return {
    state: data,
    addProduct,
    removeProduct,
  };
};

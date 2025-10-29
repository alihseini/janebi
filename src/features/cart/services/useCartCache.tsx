import { useQuery, useQueryClient } from '@tanstack/react-query';
import type { Product, CartState, UseCartCache } from '../types/cart';

interface IState {
  products: Product[];
  totalPrice: number;
  totalCount: number;
}

export const useCartCache = () => {
  const queryClient = useQueryClient();
  const QUERY_KEY = ['cart_state'] as const;

  const calculateTotalPrice = (products: Product[]) =>
    products.reduce((sum, p) => sum + p.price * (p.count || 1), 0);

  const calculateTotalCount = (products: Product[]) => products.length;

  const getInitialState = (): IState => {
    const saved = localStorage.getItem('cart_state');
    if (saved) return JSON.parse(saved);
    return { products: [], totalPrice: 0, totalCount: 0 };
  };

  const initialState: IState = getInitialState();

  const syncToLocalStorage = (state: IState) => {
    localStorage.setItem('cart_state', JSON.stringify(state));
  };

  const { data = initialState } = useQuery<IState>({
    queryKey: QUERY_KEY,
    queryFn: () => initialState,
  });

  const addProduct = (newProduct: Product) => {
    queryClient.setQueryData<IState>(QUERY_KEY, (old = initialState) => {
      const existing = old.products.find((p) => p.id === newProduct.id);
      let updatedProducts;

      if (existing) {
        updatedProducts = old.products.map((p) =>
          p.id === newProduct.id ? { ...p, count: (p.count || 1) + 1 } : p
        );
      } else {
        updatedProducts = [...old.products, { ...newProduct, count: 1 }];
      }

      const updatedState = {
        products: updatedProducts,
        totalPrice: calculateTotalPrice(updatedProducts),
        totalCount: calculateTotalCount(updatedProducts),
      };

      syncToLocalStorage(updatedState);
      return updatedState;
    });
  };

  const removeProduct = (id: number) => {
    queryClient.setQueryData<IState>(QUERY_KEY, (old = initialState) => {
      const updatedProducts = old.products.filter((p) => p.id !== id);
      const updatedState = {
        products: updatedProducts,
        totalPrice: calculateTotalPrice(updatedProducts),
        totalCount: calculateTotalCount(updatedProducts),
      };

      syncToLocalStorage(updatedState);
      return updatedState;
    });
  };

  const increaseProduct = (id: number) => {
    queryClient.setQueryData<IState>(QUERY_KEY, (old = initialState) => {
      const updatedProducts = old.products.map((p) =>
        p.id === id ? { ...p, count: (p.count || 1) + 1 } : p
      );

      const updatedState = {
        products: updatedProducts,
        totalPrice: calculateTotalPrice(updatedProducts),
        totalCount: calculateTotalCount(updatedProducts),
      };

      syncToLocalStorage(updatedState);
      return updatedState;
    });
  };

  const decreaseProduct = (id: number) => {
    queryClient.setQueryData<IState>(QUERY_KEY, (old = initialState) => {
      const updatedProducts = old.products
        .map((p) =>
          p.id === id ? { ...p, count: Math.max((p.count || 1) - 1, 0) } : p
        )
        .filter((p) => (p.count || 0) > 0);

      const updatedState = {
        products: updatedProducts,
        totalPrice: calculateTotalPrice(updatedProducts),
        totalCount: calculateTotalCount(updatedProducts),
      };

      syncToLocalStorage(updatedState);
      return updatedState;
    });
  };

  const clearCart = () => {
    const cleared = { products: [], totalPrice: 0, totalCount: 0 };
    queryClient.setQueryData(QUERY_KEY, cleared);
    syncToLocalStorage(cleared);
  };

  return {
    state: data,
    addProduct,
    removeProduct,
    increaseProduct,
    decreaseProduct,
    clearCart,
  };
};

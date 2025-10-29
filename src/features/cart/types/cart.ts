export interface Product {
  id: number;
  name: string;
  price: number;
  image?: string;
  count: number;
  title: string;
}
export interface CartState {
  products: Product[];
  totalPrice: number;
  totalCount: number;
}
export interface UseCartCache {
  state: CartState;
  addProduct: (newProduct: Product) => void;
  removeProduct: (id: number) => void;
  increaseProduct: (id: number) => void;
  decreaseProduct: (id: number) => void;
  clearCart: () => void;
}

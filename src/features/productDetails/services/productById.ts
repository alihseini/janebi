export const fetchProductById = async (id) => {
  const res = await fetch(`https://fakestoreapi.com/products/${id}`);
  if (!res.ok) throw new Error('Failed to fetch product');
  return res.json();
};

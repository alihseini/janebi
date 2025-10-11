import { useParams } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import { fetchProductById } from './services/productById';

export default function ProductDetail() {
  const { id } = useParams();

  const { data, isLoading, isError } = useQuery({
    queryKey: ['product', id],
    queryFn: () => fetchProductById(id!),
    staleTime: 1000 * 60 * 5,
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError || !data) return <p>Something went wrong.</p>;

  return (
    <div>
      <h2>{data.title}</h2>
      <img src={data.image} alt={data.title} width="200" />
      <p>{data.description}</p>
      <p>
        <b>Price:</b> ${data.price}
      </p>
    </div>
  );
}

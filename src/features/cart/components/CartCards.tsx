import React from 'react';
import styles from '../css/CartCards.module.css';
import { shortenTitle } from '../../../shared/utils/utils';
import ProductActions from '../../../shared/components/actionButtons/ProductActions';
import { useNavigate } from 'react-router';

interface Product {
  id: number;
  name: string;
  price: number;
  image?: string;
  count: number;
}

interface CartCardsProps {
  products: Product[];
  onIncrease: (id: number) => void;
  onDecrease: (id: number) => void;
  onRemove: (id: number) => void;
  onAdd: (product: Product) => void;
}

const CartCards: React.FC<CartCardsProps> = ({
  products,
  onIncrease,
  onDecrease,
  onRemove,
  onAdd,
}) => {
  const navigate = useNavigate();
  const sumPrice = (price, count) => {
    return price * count;
  };
  const cardClickHandler = (id) => {
    navigate(`/products/${id}`);
  };
  return (
    <div className={styles.cardsWrapper}>
      <h2 className={styles.title}>سبد خرید شما</h2>
      {products.map((product) => (
        <div
          key={product.id}
          className={styles.card}
          onClick={() => cardClickHandler(product.id)}
        >
          <img
            src={product.image || '/placeholder.png'}
            alt={product.title}
            className={styles.image}
          />

          <div className={styles.info}>
            <h4>{shortenTitle(product.title)}</h4>
            <p>{product.price.toLocaleString()} تومان</p>
          </div>

          <div className={styles.totalPrice}>
            مبلغ کل : {sumPrice(product.price, product.count)}
          </div>
          <ProductActions
            count={product.count}
            productId={product.id}
            addProduct={() => onAdd(product)}
            removeProduct={onRemove}
            increaseProduct={onIncrease}
            decreaseProduct={onDecrease}
          />
        </div>
      ))}
    </div>
  );
};

export default CartCards;

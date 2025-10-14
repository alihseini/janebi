import React from 'react';
import styles from '../css/CartCards.module.css';
import Button from '../../../shared/components/button/Button';
import { shortenTitle } from '../../../shared/utils/utils';

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
  const sumPrice = (price, count) => {
    return price * count;
  };
  return (
    <div className={styles.cardsWrapper}>
      <h2 className={styles.title}>سبد خرید شما</h2>
      {products.map((product) => (
        <div key={product.id} className={styles.card}>
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

          <div className={styles.actions}>
            {product.count === 0 && (
              <Button
                onClick={() => onAdd(product)}
                className={styles.addButton}
                svgSrc="bx-cart-add"
                color="white"
              />
            )}

            {product.count === 1 && (
              <div className={styles.counter}>
                <Button
                  text="+"
                  className={styles.plusBtn}
                  onClick={() => onIncrease(product.id)}
                  color="white"
                />
                <span className={styles.count}>{product.count}</span>
                <Button
                  onClick={() => onRemove(product.id)}
                  className={styles.removeBtn}
                  svgSrc="bx-trash"
                  color="white"
                  fontSize="1.2rem"
                />
              </div>
            )}

            {product.count > 1 && (
              <div className={styles.counter}>
                <Button
                  text="+"
                  className={styles.plusBtn}
                  onClick={() => onIncrease(product.id)}
                  color="white"
                />
                <span className={styles.count}>{product.count}</span>
                <Button
                  text="-"
                  className={styles.minusBtn}
                  onClick={() => onDecrease(product.id)}
                  color="white"
                />
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default CartCards;

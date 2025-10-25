import React from 'react';
import styles from '../css/styles.module.css';
import { shortenTitle } from '../../../shared/utils/utils';
import { useNavigate } from 'react-router';
import type { Product } from '../types/cart';
import ActionButtons from '../../../shared/components/ActionButtons/ActionButtons';

interface IProps {
  products: Product[];
  onIncrease: (id: number) => void;
  onDecrease: (id: number) => void;
  onRemove: (id: number) => void;
  onAdd: (product: Product) => void;
}

const CartCards: React.FC<IProps> = ({
  products,
  onIncrease,
  onDecrease,
  onRemove,
  onAdd,
}) => {
  const navigate = useNavigate();

  const sumPrice = (price: number, count: number) => price * count;
  const cardClickHandler = (id: number) => navigate(`/products/${id}`);

  return (
    <div className={styles.cartTableWrapper}>
      <h2>سبد خرید شما</h2>

      <table className={styles.cartTable}>
        <thead>
          <tr>
            <th>محصول</th>
            <th>قیمت واحد</th>
            <th>تعداد</th>
            <th>مجموع</th>
          </tr>
        </thead>

        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td className={styles.productCell}>
                <img
                  src={product.image}
                  alt={product.title}
                  className={styles.cartImage}
                  onClick={() => cardClickHandler(product.id)}
                />
                <h4 onClick={() => cardClickHandler(product.id)}>
                  {shortenTitle(product.title)}
                </h4>
              </td>
              <td>{product.price.toLocaleString()} تومان</td>
              <td>
                <ActionButtons
                  count={product.count}
                  productId={product.id}
                  addProduct={() => onAdd(product)}
                  removeProduct={onRemove}
                  increaseProduct={onIncrease}
                  decreaseProduct={onDecrease}
                />
              </td>
              <td>{sumPrice(product.price, product.count).toLocaleString()} تومان</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CartCards;

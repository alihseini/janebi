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
}

const CartCards: React.FC<IProps> = ({
  products,
  onIncrease,
  onDecrease,
  onRemove,
}) => {
  const navigate = useNavigate();

  const sumPrice = (price: number, count: number) => price * count;
  const cardClickHandler = (id: number) => navigate(`/products/${id}`);

  return (
    <div className={styles.cartTableWrapper}>
      <h2>سبد خرید</h2>

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
              <td data-label="محصول">
                <div className={styles.productCell} >
                  <img
                    src={product.image}
                    alt={product.title}
                    className={styles.cartImage}
                    onClick={() => cardClickHandler(product.id)}
                  />
                  <div className={styles.productCellText}>
                    {shortenTitle(product.title)}
                    <div className={styles.colorDiv}>
                      رنگ :
                      <div className={styles.selectedColor}>
                        <div className={styles.color}></div>
                      </div>
                    </div>
                    <span>کد: {product.id}</span>
                  </div>
                </div>
              </td>

              <td data-label="قیمت واحد" className={styles.price}>
                {product.price.toLocaleString()} تومان
              </td>

              <td data-label="تعداد" className={styles.counting}>
                <ActionButtons
                  count={product.count}
                  productId={product.id}
                  removeProduct={onRemove}
                  increaseProduct={onIncrease}
                  decreaseProduct={onDecrease}
                />
              </td>

              <td data-label="مجموع" className={styles.totalPrice}>
                {sumPrice(product.price, product.count).toLocaleString()} تومان
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CartCards;

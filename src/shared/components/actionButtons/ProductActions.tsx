import React from 'react';
import Button from '../button/Button';
import styles from './styles.module.css';

interface ProductActionsProps {
  count: number;
  productId: number;
  addProduct?: () => void;
  removeProduct?: (id: number) => void;
  increaseProduct?: (id: number) => void;
  decreaseProduct?: (id: number) => void;
}

const ProductActions: React.FC<ProductActionsProps> = ({
  count,
  productId,
  addProduct,
  removeProduct,
  increaseProduct,
  decreaseProduct,
}) => {
  if (count === 0) {
    return (
      <Button
        onClick={addProduct}
        className={styles.addButton}
        svgSrc="bx-cart-add"
        color="white"
      />
    );
  }

  return (
    <div className={styles.actions}>
      <div className={styles.counter}>
        <Button
          text="+"
          className={styles.plusBtn}
          onClick={() => increaseProduct && increaseProduct(productId)}
          color="white"
        />
        <span className={styles.count}>{count}</span>

        {count === 1 ? (
          <Button
            onClick={() => removeProduct && removeProduct(productId)}
            className={styles.removeBtn}
            svgSrc="bx-trash"
            color="white"
            fontSize="1.2rem"
          />
        ) : (
          <Button
            text="-"
            className={styles.minusBtn}
            onClick={() => decreaseProduct && decreaseProduct(productId)}
            color="white"
          />
        )}
      </div>
    </div>
  );
};

export default ProductActions;

import React from 'react';
import Button from '../Button/Button';
import styles from './styles.module.css';

interface ProductActionsProps {
  count: number;
  productId: number;
  addProduct?: () => void;
  removeProduct?: (id: number) => void;
  increaseProduct?: (id: number) => void;
  decreaseProduct?: (id: number) => void;
  isLTR?: boolean;
}

const ActionButtons: React.FC<ProductActionsProps> = ({
  count,
  productId,
  addProduct,
  removeProduct,
  increaseProduct,
  decreaseProduct,
  isLTR = false,
}) => {
  if (count === 0) {
    return (
      <Button
        onClick={addProduct}
        className={styles.addButton}
        svgSrc="bx-cart-add"
        size={30}
        color="white"
      />
    );
  }

  return (
    <div className={`${styles.actions} ${isLTR ? styles.ltr : styles.rtl}`}>
      <Button
        svgSrc="bx-plus"
        size={25}
        className={styles.plusBtn}
        onClick={() => increaseProduct && increaseProduct(productId)}
        color="#0089ff"
      />
      <span className={styles.count}>{count}</span>

      {count === 1 ? (
        <Button
          onClick={() => removeProduct && removeProduct(productId)}
          className={styles.removeBtn}
          svgSrc="bx-trash"
          color="red"
          size={25}
        />
      ) : (
        <Button
          svgSrc="bx-minus"
          size={25}
          className={styles.minusBtn}
          onClick={() => decreaseProduct && decreaseProduct(productId)}
          color="red"
        />
      )}
    </div>
  );
};

export default ActionButtons;

import React from 'react';
import CartMaker from '../cartMaker/CartMaker';
import styles from './styles.module.css';
import Button from '../button/Button';

interface CartListProps {
  data: [];
  title: string;
  button: string;
}

const CartList: React.FC<CartListProps> = ({ data, title, button }) => {
    return (
    <div className={styles.cartList}>
      <div className={styles.upperCartList}>
        <p>{title}</p>
        <Button text={button} fontSize="1.2rem" color="#0089ff" />
      </div>
      <div className={styles.allCarts}>
        {data.map((item) => (
          <CartMaker product={item} onClick={() => console.log('click')} />
        ))}
      </div>
    </div>
  );
};

export default CartList;

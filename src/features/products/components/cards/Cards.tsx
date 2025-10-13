import React from 'react';
import styles from '../../css/cards.module.css';
import CardMaker from '../../../../shared/components/cardMaker/CardMaker';

const Cards: React.FC = ({ data }) => {
  return (
    <div className={styles.container}>
      {data?.map((item) => (
        <CardMaker
          key={item.id}
          product={item}
          fullWidth={true}
        />
      ))}
    </div>
  );
};

export default Cards;

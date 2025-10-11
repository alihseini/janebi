import React from 'react';
import styles from './styles.module.css';
import CardMaker from '../../../shared/components/cardMaker/CardMaker';

const Cards: React.FC = ({ data }) => {
  return (
    <div className={styles.container}>
      {data.map((item) => (
        <CardMaker
          key={item.id}
          product={item}
          onClick={() => console.log('click')}
          className
        />
      ))}
    </div>
  );
};

export default Cards;

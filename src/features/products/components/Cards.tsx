import React from 'react';
import CardMaker from '../../../shared/components/CardMaker/CardMaker';
import AutoGrid from '../../../shared/components/AutoGrid/AutoGrid';
import styles from '../css/styles.module.css';

const Cards: React.FC = ({ data }) => {
  return (
    <div className={styles.cardsContainer}>
      <AutoGrid minWidth={250}>
        {data?.map((item) => (
          <CardMaker key={item.id} product={item} fullWidth={true} />
        ))}
      </AutoGrid>
    </div>
  );
};

export default Cards;

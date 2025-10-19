import React from 'react';
import CardMaker from '../../../shared/components/cardMaker/CardMaker';
import AutoGrid from '../../../shared/components/AutoGrid/AutoGrid';
import styles from "../css/styles.module.css"

const Cards: React.FC = ({ data }) => {
  return (
    <AutoGrid className={styles.cardsContainer} minWidth={200}  >
      {data?.map((item) => (
        <CardMaker key={item.id} product={item} fullWidth={true} />
      ))}
    </AutoGrid>
  );
};

export default Cards;

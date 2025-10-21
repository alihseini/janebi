import React, { useState, useMemo } from 'react';
import CardMaker from '../../../shared/components/CardMaker/CardMaker';
import AutoGrid from '../../../shared/components/AutoGrid/AutoGrid';
import styles from '../css/styles.module.css';
import ProductListTabs from './ProductListTabs';

const Cards: React.FC<{ data: any[] }> = ({ data }) => {
  const [tab, setTab] = useState('جدیدترین ها');
  const [count, setCount] = useState(20);

  const filteredData = useMemo(() => {
    let temp = [...data];

    switch (tab) {
      case 'جدیدترین ها':
        temp.sort((a, b) => b.createdAt - a.createdAt);
        break;
      case 'پربازدیدترین ها':
        temp.sort((a, b) => b.rating.count - a.rating.count);
        break;
      case 'محبوب ترین':
        temp.sort((a, b) => b.rating.rate - a.rating.rate);
        break;
      case 'پرفروش ترین':
        temp.sort((a, b) => b.sold - a.sold);
        break;
      case 'ارزان ترین':
        temp.sort((a, b) => a.price - b.price);
        break;
      case 'گران ترین':
        temp.sort((a, b) => b.price - a.price);
        break;
    }

    return temp.slice(0, count);
  }, [data, tab, count]);

  return (
    <div className={styles.cardsContainer}>
      <h2>اجناس</h2>
      <ProductListTabs onTabChange={setTab} onCountChange={setCount} />
      <AutoGrid minWidth={250}>
        {filteredData.map((item) => (
          <CardMaker key={item.id} product={item} fullWidth={true} />
        ))}
      </AutoGrid>
    </div>
  );
};

export default Cards;

import React from 'react';
import CardMaker from '../cardMaker/CardMaker';
import styles from './styles.module.css';
import Button from '../button/Button';
import { useNavigate } from 'react-router';

interface CardListProps {
  data: [];
  title: string;
  button: string;
}

const CardList: React.FC<CardListProps> = ({ data, title, button }) => {
  const navigate = useNavigate();
  return (
    <div className={styles.cardList}>
      <div className={styles.upperCardList}>
        <p>{title}</p>
        <Button
          text={button}
          fontSize="1.2rem"
          color="#0089ff"
          onClick={() => navigate('/products')}
        />
      </div>
      <div className={styles.allCards}>
        {data?.map((item) => (
          <CardMaker
            key={item.id}
            product={item}
            onClick={() => console.log('click')}
          />
        ))}
      </div>
    </div>
  );
};

export default CardList;

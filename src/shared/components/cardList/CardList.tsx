import React, { useRef } from 'react';
import CardMaker from '../CardMaker/CardMaker';
import styles from './styles.module.css';
import Button from '../Button/Button';
import { useNavigate } from 'react-router';

interface CardListProps {
  data: any[];
  title: string;
  button?: string;
}

const CardList: React.FC<CardListProps> = ({ data, title, button }) => {
  const navigate = useNavigate();
  const scrollRef = useRef<HTMLDivElement | null>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 300;
      scrollRef.current.scrollBy({
        left: direction === 'right' ? scrollAmount : -scrollAmount,
        behavior: 'smooth',
      });
    }
  };

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

      <div className={styles.scrollContainer}>
        <Button
          color="#0089ff"
          text="<"
          className={styles.rightButton}
          onClick={() => scroll('right')}
        />

        <div className={styles.allCards} ref={scrollRef}>
          {data?.map((item) => (
            <CardMaker
              key={item.id}
              product={item}
              onClick={() => console.log('click')}
            />
          ))}
        </div>

        <Button
          text=">"
          color="#0089ff"
          className={styles.leftButton}
          onClick={() => scroll('left')}
        />
      </div>
    </div>
  );
};

export default CardList;

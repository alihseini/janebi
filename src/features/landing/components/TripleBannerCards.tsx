import BannerCardMaker from '../../../shared/components/BannerCardMaker/BannerCardMaker';
import styles from '../css/styles.module.css';

interface BannerCard {
  title: string;
  mainImage: string;
  smallImages: string[];
}

const cardData: BannerCard[] = [
  {
    title: 'پر فروش ترین ها',
    mainImage:
      'https://janebi.com/janebi/9fd2/uploads/promotions/homepage/bangebag.png',
    smallImages: [
      'https://janebi.com/janebi/9fd2/uploads/promotions/homepage/porzgir.png',
      'https://janebi.com/janebi/9fd2/uploads/promotions/homepage/gripster.png',
    ],
  },
  {
    title: 'پر بازدید ترین ها',
    mainImage:
      'https://janebi.com/janebi/9fd2/uploads/promotions/homepage/eyeglassfinal.jpg',
    smallImages: [
      'https://janebi.com/janebi/9fd2/uploads/theme/3t/1400-10-07-13-17-46.jpg',
      'https://janebi.com/janebi/9fd2/uploads/theme/3t/1400-10-07-13-52-35.jpg',
    ],
  },
  {
    title: 'محبوب ترین ها',
    mainImage:
      'https://janebi.com/janebi/9fd2/uploads/theme/3t/1400-10-07-13-02-54.jpg',
    smallImages: [
      'https://janebi.com/janebi/9fd2/uploads/new-template/3banner/iphone-otg-min.jpg',
      'https://janebi.com/janebi/9fd2/uploads/theme/2x/8888888888.jpg',
    ],
  },
];

const TripleBannerCards = () => {
  return (
    <div className={styles.cardsWrapper}>
      {cardData.map((card, i) => (
        <BannerCardMaker
          key={i}
          title={card.title}
          mainImage={card.mainImage}
          smallImages={card.smallImages}
        />
      ))}
    </div>
  );
};

export default TripleBannerCards;

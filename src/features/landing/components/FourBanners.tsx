import BannerMaker from '../../../shared/components/BannerMaker/BannerMaker';

const images = [
  'https://janebi.com/janebi/9fd2/uploads/home-banner/car-charger.jpg',
  'https://janebi.com/janebi/9fd2/uploads/home-banner/car-accessories.jpg',
  'https://janebi.com/janebi/9fd2/uploads/home-banner/apple-watch-accessories.jpg',
  'https://janebi.com/janebi/9fd2/uploads/home-banner/airpod-accessories.jpg',
];

const FourBanner: React.FC = () => {
  return <BannerMaker images={images} />;
};

export default FourBanner;

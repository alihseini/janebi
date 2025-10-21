import { useState } from 'react';
import styles from '../css/styles.module.css';

interface Props {
  onTabChange: (tab: string) => void;
  onCountChange: (count: number) => void;
}

const ProductListTabs: React.FC<Props> = ({ onTabChange, onCountChange }) => {
  const [activeTab, setActiveTab] = useState('جدیدترین ها');
  const [activeCount, setActiveCount] = useState(20);

  const tabs = [
    'جدیدترین ها',
    'پربازدیدترین ها',
    'محبوب ترین',
    'پرفروش ترین',
    'ارزان ترین',
    'گران ترین',
  ];

  const counts = [10, 20];

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
    onTabChange(tab);
  };

  const handleCountClick = (count: number) => {
    setActiveCount(count);
    onCountChange(count);
  };

  return (
    <div className={styles.productListTabs}>
      <ul>
        {tabs.map((tab) => (
          <li
            key={tab}
            className={activeTab === tab ? styles.selectedTab : ''}
            onClick={() => handleTabClick(tab)}
          >
            {tab}
          </li>
        ))}
      </ul>
      <div>
        <p>تعداد نمایش</p>
        <ul>
          {counts.map((count) => (
            <li
              key={count}
              className={activeCount === count ? styles.selectedTab : ''}
              onClick={() => handleCountClick(count)}
            >
              {count}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ProductListTabs;

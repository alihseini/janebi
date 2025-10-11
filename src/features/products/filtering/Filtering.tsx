import React from 'react';
import styles from './styles.module.css';
import Icons from '../../../shared/icons';
import { useNavigate, createSearchParams } from 'react-router';

const categories = [
  { label: 'همه', value: '' },
  { label: 'الکترونیکی', value: 'electronics' },
  { label: 'جواهرات', value: 'jewelery' },
  { label: 'لباس مردانه', value: "men's clothing" },
  { label: 'لباس زنانه', value: "women's clothing" },
];

const Filtering: React.FC = () => {
  const navigate = useNavigate();

  const handleClick = (value: string) => {
    const params = value ? { filter: value } : {};
    navigate({
      pathname: '/products',
      search: `?${createSearchParams(params)}`,
    });
  };

  return (
    <div className={styles.container}>
      <h2>
        <Icons name="bx-filter" /> دسته بندی ها
      </h2>
      <ul>
        {categories.map((cat) => (
          <li key={cat.value} onClick={() => handleClick(cat.value)}>
            {cat.label}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Filtering;

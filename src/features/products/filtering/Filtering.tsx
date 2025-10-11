import React, { useState, useEffect } from 'react';
import styles from './styles.module.css';
import Icons from '../../../shared/icons';
import { useNavigate, useLocation, createSearchParams } from 'react-router';

const categories = [
  { label: 'همه', value: 'all' },
  { label: 'الکترونیکی', value: 'electronics' },
  { label: 'جواهرات', value: 'jewelery' },
  { label: 'لباس مردانه', value: "men's clothing" },
  { label: 'لباس زنانه', value: "women's clothing" },
];

const Filtering: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [selected, setSelected] = useState(() => {
    const params = new URLSearchParams(location.search);
    return params.get('filter') || 'all';
  });

  const handleClick = (value: string) => {
    setSelected(value);
    const params = value !== 'all' ? { filter: value } : {};
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
          <li
            key={cat.value}
            className={cat.value === selected ? styles.selected : ''}
            onClick={() => handleClick(cat.value)}
          >
            {cat.label}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Filtering;

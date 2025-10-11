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

  // هماهنگی selected با تغییرات URL
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    setSelected(params.get('filter') || 'all');
  }, [location.search]);

  const handleClick = (value: string) => {
    const params: any = {};
    if (value !== 'all') params.filter = value;

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

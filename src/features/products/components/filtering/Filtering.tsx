import React, { useState, useEffect } from 'react';
import styles from '../../css/filtering.module.css';
import Icons from '../../../../shared/icons';
import { useNavigate, useLocation, createSearchParams } from 'react-router';
import { categoryList } from '../../json/categoryList';

const Filtering: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [selected, setSelected] = useState(() => {
    const params = new URLSearchParams(location.search);
    return params.get('filter') || 'all';
  });

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
        {categoryList.map((cat) => (
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

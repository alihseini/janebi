import React from 'react';
import styles from './styles.module.css';
import Icons from '../../../shared/icons';

const Filtering: React.FC = () => {
  return (
    <div className={styles.container}>
      <h2>
        <Icons name="bx-filter"/> دسته بندی ها
      </h2>
      <ul>
        <li>همه</li>
        <li>الکترونیکی</li>
        <li>جواهرات</li>
        <li>لباس مردانه</li>
        <li>لباس زنانه</li>
      </ul>
    </div>
  );
};

export default Filtering;

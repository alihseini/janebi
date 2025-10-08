import React from 'react';
import styles from './styles.module.css';

const Filtering: React.FC = () => {
  return (
    <div className={styles.container}>
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

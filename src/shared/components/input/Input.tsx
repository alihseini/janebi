import React from 'react';
import styles from './Input.module.css';

interface InputProps {
  type?: string;
  name?: string;
  value?: string;
  placeholder?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}

const Input: React.FC<InputProps> = ({
  type = 'text',
  name,
  value,
  placeholder,
  onChange,
  className,
}) => {
  return (
    <input
      className={`${styles.input} ${className ? className : ''}`}
      id={name}
      name={name}
      type={type}
      value={value}
      placeholder={placeholder}
      onChange={onChange}
    />
  );
};

export default Input;

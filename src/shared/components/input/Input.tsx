import React from 'react';
import styles from './styles.module.css';

interface InputProps {
  type?: string;
  name?: string;
  value?: string;
  placeholder?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

const Input: React.FC<InputProps> = ({
  type = 'text',
  name,
  value,
  placeholder,
  onChange,
  className,
  onKeyDown,
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
      onKeyDown={onKeyDown}
    />
  );
};

export default Input;

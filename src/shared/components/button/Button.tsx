import React from 'react';
import styles from './Button.module.css';
import Icons from '../../icons';

interface ButtonProps {
  text?: string;
  svgSrc?: string;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
  size?: number;
}

const Button: React.FC<ButtonProps> = ({
  text,
  svgSrc,
  onClick,
  type = 'button',
  className,
  size,
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`${styles.button} ${className ? className : ''}`}
    >
      {svgSrc ? (
        <Icons name={svgSrc} size={size ? size : 30} color="gray" />
      ) : (
        text
      )}
    </button>
  );
};

export default Button;

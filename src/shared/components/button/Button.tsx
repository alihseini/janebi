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
  color?: string;
  fontSize?: string;
}

const Button: React.FC<ButtonProps> = ({
  text,
  svgSrc,
  onClick,
  type = 'button',
  className,
  size,
  color = 'gray',
  fontSize,
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`${styles.button} ${className || ''}`}
      style={{ color, fontSize }}
    >
      {svgSrc && <Icons name={svgSrc} size={size ?? 30} color={color} />}
      {text && <span>{text}</span>}
    </button>
  );
};

export default Button;

import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import styles from '../css/styles.module.css';
import { useLogin } from '../../features/landing/services/useLogin';
import Button from '../../shared/components/Button/Button';

interface LoginModalProps {
  isVisible: boolean;
  onClose: () => void;
  onLoginSuccess: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({
  isVisible,
  onClose,
  onLoginSuccess,
}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const { mutate, isLoading } = useLogin(
    { username, password },
    {
      onSuccess: (data) => {
        onLoginSuccess?.(data.token);
        onClose();
      },
    }
  );

  const handleLogin = () => {
    mutate({ username, password });
  };

  useEffect(() => {
    if (isVisible) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'auto';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isVisible]);

  return ReactDOM.createPortal(
    <div
      className={`${isVisible ? styles.showBackdrop : styles.closeBackdrop}`}
    >
      <div className={`${isVisible ? styles.openModal : styles.closeModal}`}>
        <Button
          text="X"
          color="red"
          className={styles.closeButton}
          onClick={() => onClose()}
        />
        <h2>ورود / ثبت نام</h2>
        <input
          type="text"
          placeholder="نام کاربری"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="رمز عبور"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleLogin} disabled={isLoading}>
          {isLoading ? 'در حال ورود...' : 'ورود'}
        </button>
      </div>
    </div>,
    document.body
  );
};

export default LoginModal;

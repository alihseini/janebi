import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { useLogin } from '../../services/auth';
import Cookies from 'js-cookie';
import styles from './styles.module.css';
import { toast } from 'react-toastify';

interface LoginModalProps {
  isVisible: boolean;
  onClose: () => void;
  onLoginSuccess?: (token: string) => void;
}

const LoginModal: React.FC<LoginModalProps> = ({
  isVisible,
  onClose,
  onLoginSuccess,
}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const loginMutation = useLogin();

  useEffect(() => {
    if (isVisible) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'auto';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isVisible]);

  const handleLogin = () => {
    loginMutation.mutate(
      { username, password },
      {
        onSuccess: (data) => {
          Cookies.set('token', data.token, { expires: 1 });
          if (onLoginSuccess) onLoginSuccess(data.token);
          toast.success('با موفقیت وارد شدید!', {
            position: 'top-center',
            autoClose: 5000,
            hideProgressBar: false,
            pauseOnHover: true,
            draggable: true,
          });
          onClose();
        },
        onError: (err: any) => {
          toast.error('خطا در ورود به حساب کاربری!', {
            position: 'top-center',
            autoClose: 5000,
            hideProgressBar: false,
            pauseOnHover: true,
            draggable: true,
          });
        },
      }
    );
  };

  if (!isVisible) return null;

  return ReactDOM.createPortal(
    <>
      <div
        className={`${styles.backdrop} ${isVisible ? styles.show : ''}`}
        onClick={onClose}
      />
      <div className={`${styles.modal} ${isVisible ? styles.show : ''}`}>
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
        <button onClick={handleLogin} disabled={loginMutation.isLoading}>
          {loginMutation.isLoading ? 'در حال ورود...' : 'ورود'}
        </button>
      </div>
    </>,
    document.body
  );
};

export default LoginModal;

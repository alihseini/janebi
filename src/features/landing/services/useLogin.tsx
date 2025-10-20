import { useMutation } from '@tanstack/react-query';
import { fetchService } from '../../../config/fetchServices';
import { toast } from 'react-toastify';

interface LoginResponse {
  token: string;
  username?: string;
  [key: string]: any;
}

interface UseLoginOptions {
  onSuccess?: (data: LoginResponse) => void; 
}

export const useLogin = (dataUser: { username: string; password: string }, options?: UseLoginOptions) => {
  return useMutation({
    mutationFn: (data: typeof dataUser) => fetchService('POST', 'auth/login', { data }),

    onSuccess: (data: LoginResponse) => {
      localStorage.setItem('token', data.token);
      localStorage.setItem('username', dataUser.username);

      toast.success('با موفقیت وارد شدید!', {
        position: 'top-center',
        autoClose: 3000,
      });

      if (options?.onSuccess) options.onSuccess(data);
    },

    onError: () => {
      toast.error('خطا در ورود به حساب کاربری!', {
        position: 'top-center',
        autoClose: 3000,
      });
    },
  });
};

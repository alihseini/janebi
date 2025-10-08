import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import Cookies from 'js-cookie';

interface LoginData {
  username: string;
  password: string;
}

interface LoginResponse {
  token: string;
  user: {
    id: number;
    username: string;
  };
}

export const loginUser = async (data: LoginData): Promise<LoginResponse> => {
  const res = await axios.post('https://fakestoreapi.com/auth/login', data);
  return res.data;
};

export const useLogin = () => {
  return useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      Cookies.set('token', data.token, { expires: 7 });
      Cookies.set('username', data.user.username, { expires: 7 });
    },
  });
};

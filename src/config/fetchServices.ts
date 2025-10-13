import axios from 'axios';

import { axiosInterCeptors } from './interceptor';
import { BaseUrl } from './urls';
import { toast } from 'react-toastify';

interface FetchServiceOptions {
  data?: any;
  extraHeaders?: any;
  params?: any;
}

export const fetchService = async (
  method: string,
  route: string,
  options: FetchServiceOptions = {}
) => {
  const validMethods = ['GET', 'POST', 'PUT', 'DELETE'];
  if (!validMethods.includes(method)) {
    throw new Error(`Unsupported HTTP method: ${method}`);
  }

  const { data, extraHeaders = {}, params } = options;
  const url = `${BaseUrl}/${route.replace(/^\//, '')}`;

  try {
    const response = await axiosInterCeptors({
      method: method.toLowerCase(),
      url,
      data: method !== 'GET' ? data : undefined,
      params,
      headers: {
        ...extraHeaders,
      },
    });
    return response.data;
  } catch (error: any) {
    const errorMessage = `Failed to fetch data: ${error?.response?.data?.message}. Cause: ${error?.response?.data?.cause}`;
    throw new Error(errorMessage);
  }
};

export const renewToken = async () => {
  try {
    const data: any = {
      refresh_token: JSON.parse(
        localStorage.getItem('refresh_token') as string
      ),
    };
    const result = await axios.post(`${BaseUrl}/v1/auth/renew-token`, data);
    if (result) return result;
  } catch (error: any) {
    if (
      error?.response.status >= 300 ||
      error?.response.status === 403 ||
      error?.response.status === 401
    ) {
      localStorage.removeItem('token');
      localStorage.removeItem('refresh_token');
      localStorage.removeItem('app_version');
      sessionStorage.clear();
      window.location.reload();
    } else if (error?.response.status === 400) {
      toast.error('لطفا کمی بعد مجددا تلاش کنید.');
    } else if (error?.response.status >= 500) {
      toast.error('خطا در ارتباط با سرور لطفا کمی بعد مجددا تلاش کنید');
    } else if (error?.code === 'ERR_NETWORK') {
      toast.error('لطفا اینترنت خود را متصل کنید.');
      return;
    }
    console.log(error, 'error : renewToken fail');
  }
};

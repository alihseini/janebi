import axios from 'axios';
import { renewToken } from './fetchServices';
import { toast } from 'react-toastify';

const MAX_RETRY_ATTEMPTS = 3;
const RETRY_DELAY_MS = 1000;
let isTokenRefreshing = false;
let refreshPromise: Promise<any> | null = null;

export const axiosInterCeptors: any = axios.create();
axiosInterCeptors.interceptors.request.use(
  (req: any) => {
    req.headers = {
      Authorization: '',
      'Content-Type': 'application/json',
      // Accept: "application/json",
    };

    if (req.data) {
      if (req.data instanceof FormData) {
        req.headers['Content-Type'] = 'multipart/form-data';
      } else if (typeof req.data === 'object') {
        req.headers['Content-Type'] = 'application/json';
      } else {
        req.headers['Content-Type'] = 'application/json';
      }
    }

    return req;
  },
  (error: any) => {
    return Promise.reject(error);
  }
);
axiosInterCeptors.interceptors.response.use(
  (res: any) => {
    return res;
  },
  async (error: any) => {
    const originalRequest = error.config;
    if (error.message === 'Network Error') {
      toast.error('لطفا اینترنت خود را متصل کنید');
    } else if (error.response.status === 401 && !originalRequest._retry) {
      if (!isTokenRefreshing) {
        isTokenRefreshing = true;
        refreshPromise = null;

        try {
          const res: any = await refreshPromise;

          if (res.status === 200) {
            const access_token = res.data.token;
            localStorage.setItem('token', JSON.stringify(access_token));
            originalRequest._retry = true;
            return axiosInterCeptors(originalRequest);
          } else if (res.status >= 300) {
            localStorage.clear();
          } else if (res.status === 400) {
            toast.error('لطفا کمی بعد مجددا تلاش کنید.');
          } else if (res.status >= 500) {
            toast.error('خطا در ارتباط با سرور لطفا کمی بعد مجددا تلاش کنید');
          } else if (res.status === null) {
            toast.error('لطفا اینترنت خود را متصل کنید.');
            return;
          }
        } finally {
          isTokenRefreshing = false;
          refreshPromise = null;
        }
      } else if (refreshPromise) {
        await refreshPromise;
        return axiosInterCeptors(originalRequest);
      }
    } else if (error.response.status >= 500) {
      const config = error.config;
      config.retryCount = config.retryCount || 0;

      if (config.retryCount < MAX_RETRY_ATTEMPTS - 1) {
        config.retryCount += 1;
        return new Promise((resolve) =>
          setTimeout(
            () => resolve(axiosInterCeptors.request(config)),
            RETRY_DELAY_MS
          )
        );
      } else {
        toast.error('خطا در ارتباط با سرور لطفا مجددا تلاش کنید');
      }
    } else if (error.response.status === 404) {
      toast.error('یافت نشد');
    } else if (error.response.status === 400) {
      toast.error(`${error.response.data.message}`);
    } else if (error.response.status === 403) {
      toast.error('دسترسی نا معتبر است');
    } else {
      toast.error('خطای نامشخص');
    }
    return Promise.reject(error);
  }
);

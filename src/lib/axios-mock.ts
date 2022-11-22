import axios from 'axios';
import { QueryFunction } from 'react-query';

/** Add NEXT_PUBLIC_MOCK_DEPLOYMENT_URL to your production deployment on vercel! */
const baseURL = process.env.NEXT_PUBLIC_PRODUCTION_URL
  ? `${process.env.NEXT_PUBLIC_PRODUCTION_URL}`
  : 'http://localhost:3000/api/mock';

export const apiMock = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'multipart/form-data',
  },
  withCredentials: false,
});

apiMock.defaults.withCredentials = false;

apiMock.interceptors.request.use(function (config) {
  const token = localStorage.getItem('token');
  if (config.headers) {
    config.headers.Authorization = token ? `Bearer ${token}` : '';
  }
  return config;
});

export default apiMock;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const mockQuery: QueryFunction<any> = async ({ queryKey }) => {
  const [url] = queryKey;

  const { data } = await apiMock.get(url as string);
  return data;
};

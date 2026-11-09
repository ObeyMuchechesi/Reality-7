import axios from 'axios';

// Same-origin /api in production (Vercel rewrite), local Express server in dev.
export const API_BASE_URL =
  process.env.REACT_APP_API_URL ||
  (process.env.NODE_ENV === 'production' ? '/api' : 'http://localhost:5000/api');

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
  timeout: 15000,
});

export function getApiErrorMessage(error) {
  if (error?.response?.data?.error) return error.response.data.error;
  if (error?.code === 'ECONNABORTED') return 'The request timed out. Please try again.';
  if (!error?.response) return 'Could not reach the booking service. Please try again.';
  return 'Something went wrong. Please try again.';
}

export default api;

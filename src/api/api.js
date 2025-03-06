import axios from 'axios';
import qs from 'qs';

const API_BASE_URL = 'http://192.168.1.37:8008/';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export const loginUser = async (credentials) => {
  try {
    const response = await api.post(
      '/users/token',
      qs.stringify({
        username: credentials.username,
        password: credentials.password,
        grant_type: 'password',
      })
    );
    return response.data;
  } catch (error) {
    throw error.response?.data || { detail: 'Login failed' };
  }
};

export const registerUser = async (userData) => {
  try {
    const response = await api.post('/users/register', userData, {
      headers: { 'Content-Type': 'application/json' },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || { detail: 'Registration failed' };
  }
};

export const getUserProfile = async () => {
  try {
    const response = await api.get('/users/me');
    return response.data;
  } catch (error) {
    throw error.response?.data || { detail: 'Failed to fetch profile' };
  }
};

export const getPages = async () => {
  try {
    const response = await api.get('/pages/', {
      headers: { 'Content-Type': 'application/json' },
    });
    return response.data; // Array of { id, name, is_in_menu }
  } catch (error) {
    throw error.response?.data || { detail: 'Failed to fetch pages' };
  }
};


export const getPageByName = async (pageName) => {
  try {
    const pages = await getPages();
    const page = pages.find((p) => p.name.toLowerCase().replace(/\s+/g, '-') === pageName);
    if (!page) throw new Error('Page not found');
    const response = await api.get(`/pages/${page.id}`, {
      headers: { 'Content-Type': 'application/json' },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || { detail: 'Failed to fetch page' };
  }
};

export const getCategories = async () => {
  try {
    const response = await api.get('/categories/', {
      headers: { 'Content-Type': 'application/json' },
    });
    return response.data; // Array of { id, name, description, parent_id, subcategories }
  } catch (error) {
    throw error.response?.data || { detail: 'Failed to fetch categories' };
  }
};

export default api;
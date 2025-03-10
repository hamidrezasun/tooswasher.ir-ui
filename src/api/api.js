import axios from 'axios';
import { getToken } from './auth';

const API_URL = 'https://api.tooswasher.com';

const api = axios.create({
  baseURL: API_URL,
  headers: { 'Content-Type': 'application/json' },
});

export const setAuthToken = (token) => {
  if (token) api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  else delete api.defaults.headers.common['Authorization'];
};

const token = getToken();
if (token) setAuthToken(token);
export const loginForAccessToken = async (formData) => (await api.post('/users/token', formData, {
  headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
})).data;

export const registerUser = async (userData) => (await api.post('/users/register', userData)).data;
export const getUserProfile = async () => (await api.get('/users/me')).data;
export const getProducts = async () => (await api.get('/products/')).data;
export const getProductById = async (id) => (await api.get(`/products/${id}`)).data;
export const createProduct = async (data) => (await api.post('/products/', data)).data;
export const updateProduct = async (id, data) => (await api.put(`/products/${id}`, data)).data;
export const deleteProduct = async (id) => await api.delete(`/products/${id}`);
export const addToCart = async (productId, quantity) => (await api.post('/cart/', { product_id: productId, quantity })).data;
export const getCart = async () => (await api.get('/cart/')).data;
export const getCategoryById = async (id) => (await api.get(`/categories/${id}`)).data;
export const getCategories = async () => (await api.get('/categories/')).data; // Added this line
export const getPages = async () => (await api.get('/pages/')).data;
export const getDiscounts = async () => (await api.get('/discounts/')).data;
export const createDiscount = async (data) => (await api.post('/discounts/', data)).data;
export const updateDiscount = async (id, data) => (await api.put(`/discounts/${id}`, data)).data;
export const deleteDiscount = async (id) => await api.delete(`/discounts/${id}`);
export const getEvents = async () => (await api.get('/events/')).data;
export const getEventById = async (id) => (await api.get(`/events/${id}`)).data;
export const createEvent = async (data) => (await api.post('/events/', data)).data;
export const updateEvent = async (id, data) => (await api.put(`/events/${id}`, data)).data;
export const deleteEvent = async (id) => await api.delete(`/events/${id}`);
export const getEventActivities = async (eventId) => (await api.get(`/events/${eventId}/activities/`)).data;
export const createEventActivity = async (eventId, data) => (await api.post(`/events/${eventId}/activities/`, data)).data;

export default { setAuthToken };
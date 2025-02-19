import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000/api' });

// Authentication and User APIs
export const signup = (userData) => API.post('/auth/signup', userData);
export const verifyOTP = (otpData) => API.post('/auth/verify-otp', otpData);
export const login = (userData) => API.post('/auth/login', userData);
export const logout = (userData) => API.post('/auth/logout', userData);

// Product APIs
export const getProducts = () => API.get('/products');
export const selectProduct = (data) => API.post('/products/select', data);

// Payment APIs
export const createOrder = (data) => API.post('/payments/order', data);
export const verifyPayment = (data) => API.post('/payments/verify', data);

// Cart APIs
export const addToCart = (data) => API.post('/cart/add', data); 
export const getCart = (userId) => API.get(`/cart/${userId}`); 
export const removeFromCart = (data) => API.delete('/cart/remove', { data }); 

export default API;
